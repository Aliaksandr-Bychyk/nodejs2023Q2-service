import { Injectable } from '@nestjs/common';
import getCurrentTime from 'src/utils/getCurrentTime';

@Injectable()
export class LoggingService {
  logRequest(message: string) {
    const currentTime = getCurrentTime();
    console.log(`[${currentTime} INFO] ${message}`);
  }

  logError(error: any) {
    const currentTime = getCurrentTime();
    console.log(`[${currentTime} ERROR] ${error}`);
  }
}
