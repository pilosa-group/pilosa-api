import { Module } from '@nestjs/common';
import { ClientModule } from '@app/client';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BeaconController } from '@app/web-metrics/beacon.controller';
import { FrontendAppService } from '@app/web-metrics/frontend-app.service';
import { BrowserMetricService } from '@app/web-metrics/browser-metric.service';
import { BrowserMetric } from '@app/web-metrics/entities/browser-metric.entity';
import { FrontendApp } from '@app/web-metrics/entities/frontend-app.entity';

@Module({
  controllers: [BeaconController],
  providers: [FrontendAppService, BrowserMetricService],
  imports: [
    ClientModule,
    ConfigModule,
    TypeOrmModule.forFeature([BrowserMetric, FrontendApp]),
  ],
  exports: [],
})
export class WebMetricsModule {}
