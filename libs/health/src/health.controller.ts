import { Controller, Get } from '@nestjs/common';
import { Public } from '@app/auth/decorators/public.decorator';

@Controller('health')
export class HealthController {
  @Get()
  @Public()
  getHealth(): string {
    return 'OK';
  }
}
