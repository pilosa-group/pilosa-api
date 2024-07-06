import { Public } from '@app/auth/decorators/public.decorator';
import { Controller, Get } from '@nestjs/common';
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
