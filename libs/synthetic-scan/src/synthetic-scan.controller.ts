import { Body, Controller, Post } from '@nestjs/common';
import { Public } from '@app/auth/decorators/public.decorator';
import {
  SyntheticScanService,
  VisitResult,
} from '@app/synthetic-scan/synthetic-scan.service';
import { BrowserMetricDomain } from '@app/web-metrics/entities/browser-metric-domain.entity';

type ScanPayload = {
  url: string;
};

@Controller('synthetic-scan')
export class SyntheticScanController {
  constructor(private syntheticScanService: SyntheticScanService) {}

  @Post()
  @Public()
  scan(@Body() { url }: ScanPayload): Promise<BrowserMetricDomain> {
    try {
      return this.syntheticScanService.run(url);
    } catch (error) {
      console.error(error);
      throw new Error('Unable to scan URL');
    }
  }
}
