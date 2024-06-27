import { Controller, Get, Param } from '@nestjs/common';
import { FrontendAppService } from '@app/web-metrics/frontend-app.service';
import { FrontendApp } from '@app/web-metrics/entities/frontend-app.entity';

@Controller('frontend-apps')
export class FrontendAppsController {
  constructor(private frontendAppService: FrontendAppService) {}

  @Get(':id')
  async getFrontendApp(
    @Param('id') frontendAppId: string,
  ): Promise<FrontendApp> {
    return this.frontendAppService.findOneById(frontendAppId);
  }
}
