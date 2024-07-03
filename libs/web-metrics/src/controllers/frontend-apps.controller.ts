import { Controller, Get, Param } from '@nestjs/common';
import { FrontendAppService } from '@app/web-metrics/frontend-app.service';
import { FrontendApp } from '@app/web-metrics/entities/frontend-app.entity';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Frontend Applications')
@Controller('frontend-apps')
export class FrontendAppsController {
  constructor(private frontendAppService: FrontendAppService) {}

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Get a frontend application',
    type: FrontendApp,
  })
  async getFrontendApp(@Param('id') id: string): Promise<FrontendApp> {
    return this.frontendAppService.findOneById(id);
  }
}
