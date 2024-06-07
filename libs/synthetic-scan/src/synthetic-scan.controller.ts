import { Body, Controller, Post } from '@nestjs/common';
import { Public } from '@app/auth/decorators/public.decorator';
import {
  SyntheticScanService,
  VisitResult,
} from '@app/synthetic-scan/synthetic-scan.service';

type ScanPayload = {
  url: string;
};

@Controller('synthetic-scan')
export class SyntheticScanController {
  constructor(private syntheticScanService: SyntheticScanService) {}

  @Post()
  @Public()
  scan(@Body() { url }: ScanPayload): Promise<VisitResult> {
    return this.syntheticScanService.run(url);
  }
}
