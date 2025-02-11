import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger(LoggerMiddleware.name);

  use(req: Request, res: Response, next: NextFunction) {
    this.logger.log(`Incoming Request: ${req.method} ${req.originalUrl}`);
    res.on('finish', () => {
      this.logger.log(`Response Status: ${res.statusCode}`);
    });
    next();
  }
}
