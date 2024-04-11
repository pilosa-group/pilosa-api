import { Controller, Request, Get } from '@nestjs/common';

@Controller()
export class MeController {
  @Get('me')
  getProfile(@Request() req) {
    return req.user;
  }
}
