import { Public } from '@app/auth/decorators/public.decorator';
import { Controller, Get, HttpStatus, Redirect } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController()
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
