import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): object {
    return {
      message: this.appService.getHello()
    };
  }

  @Get("user/")
  getUser(
    @Param() name: string,
    @Param() email: string,
    @Param() phone: string) {
      
  }
}
