import { Controller, Get, HttpStatus, Redirect } from '@nestjs/common';
import { Public } from '@app/auth/decorators/public.decorator';

@Controller({
  version: '',
})
export class IndexController {
  @Get()
  @Public()
  @Redirect(
    'https://www.pilosa.io?utm_source=app&utm_medium=redirect&utm_campaign=home',
    HttpStatus.TEMPORARY_REDIRECT,
  )
  index(): void {}
}