import { Injectable } from '@nestjs/common';

@Injectable()
export class LoggingService {
  logRequest(message: string) {
    console.log(message);
  }

  logError(error: any) {
    console.log(error);
  }
}
