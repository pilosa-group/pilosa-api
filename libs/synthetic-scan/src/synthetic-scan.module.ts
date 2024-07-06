import { GreenHostingService } from '@app/synthetic-scan/green-hosting.service';
import { SyntheticScanController } from '@app/synthetic-scan/synthetic-scan.controller';
import { WebMetricsModule } from '@app/web-metrics';
import { Module, forwardRef } from '@nestjs/common';

import { SyntheticScanService } from './synthetic-scan.service';

@Module({
  controllers: [SyntheticScanController],
  exports: [SyntheticScanService],
  imports: [forwardRef(() => WebMetricsModule)],
  providers: [SyntheticScanService, GreenHostingService],
})
export class SyntheticScanModule {}
