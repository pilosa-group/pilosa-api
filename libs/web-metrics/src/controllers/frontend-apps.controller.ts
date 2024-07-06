import { TransformerService } from '@app/api/transformer.service';
import { FrontendAppDto } from '@app/web-metrics/dto/frontend-app.dto';
import { FrontendApp } from '@app/web-metrics/entities/frontend-app.entity';
import { FrontendAppService } from '@app/web-metrics/frontend-app.service';
import { Controller, Get, Param } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

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
    description: 'Get a frontend application',
    status: 200,
    type: FrontendAppDto,
  })
  @ApiOperation({
    operationId: 'getFrontendApp',
    summary: 'Get a frontend application',
  })
  async getFrontendApp(@Param('id') id: string): Promise<FrontendAppDto> {
    return this.transformerService.entityToDto<FrontendApp, FrontendAppDto>(
      await this.frontendAppService.findOneById(id),
      FrontendAppDto,
    );
  }
}
