import { ApiPaginatedResponse } from '@app/api/openapi/decorators/api-paginated-response.decorator';
import { PaginatorDto } from '@app/api/paginator.dto';
import { CurrentUser } from '@app/user/decorators/current-user.decorator';
import { UserDto } from '@app/user/dto/user.dto';
import { BrowserMetricService } from '@app/web-metrics/browser-metric.service';
import { GetBrowserMetricsOptionsDto } from '@app/web-metrics/dto/browser-metrics-options.dto';
import { CarbonEmissionMetricDto } from '@app/web-metrics/dto/carbon-emission-metric.dto';
import { FrontendApp } from '@app/web-metrics/entities/frontend-app.entity';
import { FrontendAppService } from '@app/web-metrics/frontend-app.service';
import {
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Metrics')
@Controller('browser-metrics')
export class BrowserMetricsController {
  constructor(
    private frontendAppService: FrontendAppService,
    private browserMetricsService: BrowserMetricService,
  ) {}

  @Get('/:frontendAppId')
  @ApiPaginatedResponse(CarbonEmissionMetricDto, {
    description: 'Get browser metrics for a frontend app',
  })
  @ApiOperation({
    operationId: 'getBrowserMetrics',
    summary: 'Get browser metrics for a frontend app',
  })
  async getMetrics(
    @Param('frontendAppId', ParseUUIDPipe) frontendAppId: FrontendApp['id'],
    @Query() { limit = 100, offset = 0, period }: GetBrowserMetricsOptionsDto,
    @CurrentUser() user: UserDto,
  ): Promise<PaginatorDto<CarbonEmissionMetricDto>> {
    const frontendApp = await this.frontendAppService.findOneById(
      frontendAppId,
      user,
    );

    if (!frontendApp) {
      throw new NotFoundException();
    }

    return this.browserMetricsService.findByFrontendApp(frontendApp, {
      limit,
      offset,
      period,
    });
  }
}
