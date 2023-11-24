import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async getAuthCode(): Promise<string> {
    
    return ""
  }

  async getAccessToken(key, value): Promise<string> {
      
    return "";
  }

  
}
