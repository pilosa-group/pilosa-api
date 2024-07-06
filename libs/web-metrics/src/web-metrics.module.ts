import { ApiModule } from '@app/api';
import { SyntheticScanModule } from '@app/synthetic-scan';
import { BeaconController } from '@app/web-metrics/beacon.controller';
import { BrowserMetricService } from '@app/web-metrics/browser-metric.service';
import { BrowserMetricDomainService } from '@app/web-metrics/browser-metric-domain.service';
import { BrowserMetricPathService } from '@app/web-metrics/browser-metric-path.service';
import { BrowserMetricsController } from '@app/web-metrics/browser-metrics.controller';
import { FrontendAppsController } from '@app/web-metrics/controllers/frontend-apps.controller';
import { AssetGroupStatistics } from '@app/web-metrics/entities/asset-group-statistics.entity';
import { BrowserMetric } from '@app/web-metrics/entities/browser-metric.entity';
import { Domain } from '@app/web-metrics/entities/domain.entity';
import { FrontendApp } from '@app/web-metrics/entities/frontend-app.entity';
import { Path } from '@app/web-metrics/entities/path.entity';
import { PathStatistics } from '@app/web-metrics/entities/path-statistics.entity';
import { FrontendAppService } from '@app/web-metrics/frontend-app.service';
import { PageScannerService } from '@app/web-metrics/page-scanner.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [
    BeaconController,
    BrowserMetricsController,
    FrontendAppsController,
  ],
  exports: [
    BrowserMetricDomainService,
    BrowserMetricPathService,
    BrowserMetricService,
    FrontendAppService,
  ],
  imports: [
    ConfigModule,
    ApiModule,
    MikroOrmModule.forFeature([
      BrowserMetric,
      AssetGroupStatistics,
      Domain,
      Path,
      PathStatistics,
      FrontendApp,
    ]),
    forwardRef(() => SyntheticScanModule),
  ],
  providers: [
    BrowserMetricDomainService,
    BrowserMetricPathService,
    BrowserMetricService,
    FrontendAppService,
    PageScannerService,
  ],
})
export class WebMetricsModule {}
