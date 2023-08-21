import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { LoggingService } from './logging.service';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  constructor(private readonly loggingService: LoggingService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { method, body, originalUrl, query } = req;
    const { statusCode } = res;
    this.loggingService.logRequest(
      `(${method}:${originalUrl}) Body: ${JSON.stringify(
        body,
      )}, Query: ${JSON.stringify(query)}, StatusCode: ${statusCode}.`,
    );
    next();
  }
}
