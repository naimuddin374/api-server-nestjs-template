import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { LoggerModule } from "nestjs-pino";
import { join } from "path";
import { v4 as uuid } from "uuid";
import { AuthMiddleware } from "./auth/auth.middleware";
import { RolesGuard } from "./auth/roles.guard";

import { IS_PROD } from "./util/config";
import { IncomingMessage } from "http";
import { TagModule } from "./tag/tag.module";
import { HealthModule } from "./health/health.module";
import { ProfilesModule } from "./profiles/profiles.module";

const REQUEST_ID_HEADER = "x-request-id";

const commonDbConfigs: TypeOrmModuleOptions = {
  type: "postgres",
  port: Number(process.env.DB_PORT) || 5432,
  logging: false,
  host: process.env.DB_HOST || "localhost",
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: true,
  autoLoadEntities: true,
};

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        level: IS_PROD ? 'info' : 'debug',
        transport: !IS_PROD
          ? {
              target: 'pino-pretty',
              options: {
                singleLine: true,
                colorize: true,
                translateTime: 'SYS:standard',
                ignore: 'pid,hostname',
              },
            }
          : undefined,
        genReqId: (req: IncomingMessage) =>
          req.headers[REQUEST_ID_HEADER]
            ? String(req.headers[REQUEST_ID_HEADER])
            : uuid(),
        serializers: {
          req: (req: IncomingMessage) => ({
            method: req.method,
            url: req.url,
          }),
          res: (res) => ({
            statusCode: res.statusCode,
          }),
        },
        customLogLevel: (req, res, err) => {
          if (req.url?.includes('public/health')) {
            return 'silent'; // Suppress health check logs
          }
          if (res.statusCode >= 500 || err) {
            return 'error'; // Error level for 5xx and unhandled exceptions
          } else if (res.statusCode >= 400) {
            return 'warn'; // Warning for 4xx responses
          }
          return 'info'; // Info level for successful requests
        },
        customSuccessMessage: (req, res) => {
          // Ensure success messages always show a valid status
          return `Request completed with status ${res?.statusCode || 'unknown'}`;
        },
        customErrorMessage: (error: any, res) => {
          // Include error details and ensure the status code is shown
          const message = error?.message || 'An unknown error occurred';
          const statusCode = res?.statusCode || 'unknown';
          return `Error occurred: ${message} | Status: ${statusCode}`;
        },
      },
    }),
    TypeOrmModule.forRoot({
      ...commonDbConfigs,
      entities: [join(__dirname, "**", "*.entity.{ts,js}")],
    }),
    TagModule,
    HealthModule,
    ProfilesModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: "main/docs/(.*)", method: RequestMethod.GET },
        { path: "main/public/(.*)", method: RequestMethod.ALL },
        { path: "main/docs-json", method: RequestMethod.GET },
      )
      .forRoutes(
        { path: "/*", method: RequestMethod.POST },
        { path: "/*", method: RequestMethod.PUT },
        { path: "/*", method: RequestMethod.GET },
        { path: "/*", method: RequestMethod.DELETE }
      );
  }
}
