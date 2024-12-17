import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ClerkAuthGuard } from './clerk/clerk.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(ClerkAuthGuard)
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
