import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Request, Response } from 'express';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    const { method, url, body, query, params, headers } = request;
    const userAgent = headers['user-agent'] || '';
    const ip = request.ip || request.connection.remoteAddress;

    const startTime = Date.now();
    const requestId = this.generateRequestId();

    // Log incoming request
    this.logger.log(
      JSON.stringify(
        {
          type: 'REQUEST',
          requestId,
          method,
          url,
          query,
          params,
          body: this.sanitizeBody(body),
          userAgent,
          ip,
          timestamp: new Date().toISOString(),
        },
        null,
        2,
      ),
    );

    return next.handle().pipe(
      tap((data) => {
        const duration = Date.now() - startTime;

        // Log successful response - structured JSON only
        this.logger.log(
          JSON.stringify(
            {
              requestId,
              method,
              url,
              statusCode: response.statusCode,
              duration: `${duration}ms`,
              responseData: this.sanitizeResponse(data),
              timestamp: new Date().toISOString(),
            },
            null,
            2,
          ),
        );
      }),
      catchError((error) => {
        const duration = Date.now() - startTime;

        // Log error response
        this.logger.error(
          `[${requestId}] Error Response: ${method} ${url} - ${error.status || 500} - ${duration}ms`,
          JSON.stringify(
            {
              requestId,
              method,
              url,
              statusCode: error.status || 500,
              duration: `${duration}ms`,
              error: {
                message: error.message,
                stack: error.stack,
                name: error.name,
              },
              timestamp: new Date().toISOString(),
            },
            null,
            2,
          ),
        );

        throw error;
      }),
    );
  }

  private generateRequestId(): string {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }

  private sanitizeBody(body: any): any {
    if (!body) return body;

    const sensitiveFields = [
      'password',
      'token',
      'secret',
      'key',
      'authorization',
    ];
    const sanitized = { ...body };

    sensitiveFields.forEach((field) => {
      if (sanitized[field]) {
        sanitized[field] = '***REDACTED***';
      }
    });

    return sanitized;
  }

  private sanitizeResponse(data: any): any {
    if (!data) return data;

    // Show JSON structure with keys but limit values to 15 chars
    return this.createStructurePreview(data);
  }

  private createStructurePreview(obj: any, depth: number = 0): any {
    if (depth > 3) return '...'; // Prevent deep nesting

    if (obj === null || obj === undefined) return obj;

    if (typeof obj === 'string') {
      return obj.length > 15 ? obj.substring(0, 15) + '...' : obj;
    }

    if (typeof obj === 'number' || typeof obj === 'boolean') {
      return obj;
    }

    if (Array.isArray(obj)) {
      if (obj.length === 0) return [];
      return [
        this.createStructurePreview(obj[0], depth + 1),
        ...(obj.length > 1 ? [`...${obj.length - 1} more items`] : []),
      ];
    }

    if (typeof obj === 'object') {
      const result: any = {};
      const keys = Object.keys(obj);

      for (const key of keys) {
        result[key] = this.createStructurePreview(obj[key], depth + 1);
      }

      return result;
    }

    return obj;
  }
}
