import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BeaconController } from '@app/web-metrics/beacon.controller';
import { FrontendAppService } from '@app/web-metrics/frontend-app.service';
import { BrowserMetricService } from '@app/web-metrics/browser-metric.service';
import { BrowserMetric } from '@app/web-metrics/entities/browser-metric.entity';
import { FrontendApp } from '@app/web-metrics/entities/frontend-app.entity';
import { BrowserMetricsController } from '@app/web-metrics/browser-metrics.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
// import { FrontendAppResolver } from '@app/web-metrics/graphql/frontend-app.resolver';
import { BrowserMetricDomain } from '@app/web-metrics/entities/browser-metric-domain.entity';
import { BrowserMetricPath } from '@app/web-metrics/entities/browser-metric-path.entity';
import { BrowserMetricAssetGroup } from '@app/web-metrics/entities/browser-metric-asset-group.entity';
import { BrowserMetricDomainService } from '@app/web-metrics/browser-metric-domain.service';
import { BrowserMetricPathService } from '@app/web-metrics/browser-metric-path.service';
import { BrowserMetricPathStats } from '@app/web-metrics/entities/browser-metric-path-stats.entity';

@Module({
  controllers: [BeaconController, BrowserMetricsController],
  providers: [
    BrowserMetricDomainService,
    BrowserMetricPathService,
    BrowserMetricService,
    // FrontendAppResolver,
    FrontendAppService,
  ],
  imports: [
    ConfigModule,
    MikroOrmModule.forFeature([
      BrowserMetric,
      BrowserMetricAssetGroup,
      BrowserMetricDomain,
      BrowserMetricPath,
      BrowserMetricPathStats,
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
