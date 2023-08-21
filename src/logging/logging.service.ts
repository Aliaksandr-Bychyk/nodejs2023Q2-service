import { Injectable } from '@nestjs/common';
import getCurrentTime from 'src/utils/getCurrentTime';
import * as winston from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';

@Injectable()
export class LoggingService {
  private readonly logger: winston.Logger;

  constructor() {
    const levels = {
      none: 0,
      error: 1,
      info: 2,
    };
    this.logger = winston.createLogger({
      levels,
      level: Object.entries(levels).find(
        (level) => level[1] === (+process.env.LOG_LEVEL || 2),
      )[0],
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => {
          return `[${getCurrentTime(timestamp)} ${level}] ${message}`;
        }),
      ),
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({
          filename: 'logs/error.log',
          level: 'error',
        }),
        new DailyRotateFile({
          filename: 'logs/%DATE%.log',
          datePattern: 'YYYY-MM-DD-HH',
          zippedArchive: true,
          maxSize: (process.env.LOG_FILE_SIZE_IN_KB || '100') + 'kb',
          maxFiles: '14d',
        }),
      ],
    });
  }

  logRequest(message: string) {
    this.logger.info(message);
  }

  logError(error: any) {
    this.logger.error(error);
  }
}
