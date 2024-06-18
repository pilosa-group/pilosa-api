import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BeaconController } from '@app/web-metrics/beacon.controller';
import { FrontendAppService } from '@app/web-metrics/frontend-app.service';
import { BrowserMetricService } from '@app/web-metrics/browser-metric.service';
import { BrowserMetric } from '@app/web-metrics/entities/browser-metric.entity';
import { FrontendApp } from '@app/web-metrics/entities/frontend-app.entity';
import { BrowserMetricsController } from '@app/web-metrics/browser-metrics.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Domain } from '@app/web-metrics/entities/domain.entity';
import { Path } from '@app/web-metrics/entities/path.entity';
import { AssetGroupStatistics } from '@app/web-metrics/entities/asset-group-statistics.entity';
import { BrowserMetricDomainService } from '@app/web-metrics/browser-metric-domain.service';
import { BrowserMetricPathService } from '@app/web-metrics/browser-metric-path.service';
import { PathStatistics } from '@app/web-metrics/entities/path-statistics.entity';

@Module({
  controllers: [BeaconController, BrowserMetricsController],
  providers: [
    BrowserMetricDomainService,
    BrowserMetricPathService,
    BrowserMetricService,
    FrontendAppService,
  ],
  imports: [
    ConfigModule,
    MikroOrmModule.forFeature([
      BrowserMetric,
      AssetGroupStatistics,
      Domain,
      Path,
      PathStatistics,
      FrontendApp,
    ]),
  ],
  exports: [
    BrowserMetricDomainService,
    BrowserMetricPathService,
    BrowserMetricService,
    FrontendAppService,
  ],
})
export class WebMetricsModule {}
