import { Module } from '@nestjs/common';
import { SyntheticScanService } from './synthetic-scan.service';
import { SyntheticScanController } from '@app/synthetic-scan/synthetic-scan.controller';
import { GreenHostingService } from '@app/synthetic-scan/green-hosting.service';
import { WebMetricsModule } from '@app/web-metrics';

@Module({
  controllers: [SyntheticScanController],
  providers: [SyntheticScanService, GreenHostingService],
  imports: [WebMetricsModule],
  exports: [SyntheticScanService],
})
export class SyntheticScanModule {}
