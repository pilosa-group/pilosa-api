import { Controller, Get } from '@nestjs/common';
import { Public } from '@app/auth/decorators/public.decorator';
import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController()
@Controller('health')
export class HealthController {
  @Get()
  @Public()
  getHealth(): string {
    return 'OK';
  }
}
