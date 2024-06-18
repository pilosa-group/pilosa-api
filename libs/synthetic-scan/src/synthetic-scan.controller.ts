import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { Public } from '@app/auth/decorators/public.decorator';
import { SyntheticScanService } from '@app/synthetic-scan/synthetic-scan.service';

type ScanPayload = {
  url: string;
};

@Controller('synthetic-scan')
@UseInterceptors(ClassSerializerInterceptor)
export class SyntheticScanController {
  constructor(private syntheticScanService: SyntheticScanService) {}

  @Post()
  @Public()
  scan(@Body() { url }: ScanPayload): Promise<any> {
    try {
      return this.syntheticScanService.run(url);
    } catch (error) {
      throw new Error(`Unable to scan URL ${url}`);
    }
  }
}
