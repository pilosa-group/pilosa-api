import { Public } from '@app/auth/decorators/public.decorator';
import { Controller, Get, Header } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController()
@Controller({
  version: '',
})
export class RobotsController {
  @Get('robots.txt')
  @Public()
  @Header('Content-Type', 'text/plain')
  robots(): string {
    return `User-agent: *
Disallow: /`;
  }
}
