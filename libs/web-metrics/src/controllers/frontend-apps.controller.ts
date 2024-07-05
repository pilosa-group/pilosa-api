import { Controller, Get, Param } from '@nestjs/common';
import { FrontendAppService } from '@app/web-metrics/frontend-app.service';
import { FrontendApp } from '@app/web-metrics/entities/frontend-app.entity';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { TransformerService } from '@app/api/transformer.service';
import { FrontendAppDto } from '@app/web-metrics/dto/frontend-app.dto';

@ApiBearerAuth()
@ApiTags('Frontend Applications')
@Controller('frontend-apps')
export class FrontendAppsController {
  constructor(
    private frontendAppService: FrontendAppService,
    private transformerService: TransformerService,
  ) {}

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Get a frontend application',
    type: FrontendAppDto,
  })
  @ApiOperation({
    summary: 'Get a frontend application',
    operationId: 'getFrontendApp',
  })
  async getFrontendApp(@Param('id') id: string): Promise<FrontendAppDto> {
    return this.transformerService.entityToDto<FrontendApp, FrontendAppDto>(
      await this.frontendAppService.findOneById(id),
      FrontendAppDto,
    );
  }
}
