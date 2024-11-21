const configuration = process.env.NODE_ENV || "development";
console.log('configuration=', configuration)
// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config({ path: `.env.${configuration}` });

import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { ValidationPipe, Logger } from '@nestjs/common';
import compression from '@fastify/compress';
import cors from '@fastify/cors';
import { fastifyHelmet } from '@fastify/helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './common/response.interceptor';
import fs from 'fs';
import { IS_PROD } from './util/config';
console.log('IS_PROD=', IS_PROD)

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: false }) // Use LoggerModule for centralized logging
  );

  // Enable compression
  await app.register(compression, { encodings: ['gzip', 'deflate'] });

  // Enable CORS
  await app.register(cors, {
    origin: (origin, cb) => {
      if (!origin || origin.startsWith('http://localhost')) {
        cb(null, true);
      } else {
        cb(new Error('Not allowed by CORS'), false);
      }
    },
  });

  // Add Helmet for security
  await app.register(fastifyHelmet);

  // Add global validation pipes
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );

  // Add a global response interceptor
  app.useGlobalInterceptors(new ResponseInterceptor());

  // Setup Swagger documentation
  // if (!IS_PROD) {
    const packageData = JSON.parse(fs.readFileSync('./package.json').toString());

    const swaggerConfig = new DocumentBuilder()
      .setTitle('Main Service API')
      .setDescription('API documentation for the main service')
      .setVersion(packageData.version)
      .addBearerAuth( {
          type: "apiKey",
          name: "authorization",
          in: "header",
        } )
      .build();

    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('main/docs', app, document);
  // }

  // Start the server
  const port = process.env.PORT || 4002;
  await app.listen(port, '0.0.0.0');
  logger.log(`Application is running on http://localhost:${port}`);
}

bootstrap();
