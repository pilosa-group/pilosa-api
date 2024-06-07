import { Controller, Post } from '@nestjs/common';
import { Public } from '@app/auth/decorators/public.decorator';
import { SyntheticScanService, VisitResult } from '@app/synthetic-scan/synthetic-scan.service';

@Controller('synthetic-scan')
export class SyntheticScanController {
  constructor(private syntheticScanService: SyntheticScanService) {}

  @Post()
  @Public()
  scan(): Promise<VisitResult> {
    return this.syntheticScanService.run('https://www.hetscheepvaartmuseum.nl/');
  }
}
