import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
  } from '@nestjs/common';
  import { Observable, throwError } from 'rxjs';
  import { map, catchError } from 'rxjs/operators';
  
  @Injectable()
  export class ResponseInterceptor<T> implements NestInterceptor<T> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      const ctx = context.switchToHttp();
      const response = ctx.getResponse();
      const request = ctx.getRequest();
      return next.handle().pipe(
        map((data) => ({
          // statusCode: response.statusCode,
          statusCode: response.statusCode || response.getStatus?.() || 200, // Use fallback to ensure status is available
          timestamp: new Date().toISOString(),
          path: request.url,
          method: request.method,
          data,
        }))
      );
    }
  }
  