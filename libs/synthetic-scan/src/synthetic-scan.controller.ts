import { Body, Controller, Post } from '@nestjs/common';
import { Public } from '@app/auth/decorators/public.decorator';
import { SyntheticScanService } from '@app/synthetic-scan/synthetic-scan.service';
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { ScanResultV1Dto } from '@app/synthetic-scan/dto/scan-result-v1.dto';
import { IsNotEmpty, IsUrl } from 'class-validator';

class ScanPayloadDto {
  @IsNotEmpty()
  @IsUrl({ require_tld: false })
  @ApiProperty({ example: 'https://www.pilosa.io' })
  url: string;
}

@ApiTags('Quick Scan')
@Controller('synthetic-scan')
export class SyntheticScanController {
  constructor(private syntheticScanService: SyntheticScanService) {}

  @Post()
  @Public()
  @ApiOperation({
    summary: 'Run a synthetic scan on a given URL',
  })
  scan(@Body() { url }: ScanPayloadDto): Promise<ScanResultV1Dto> {
    try {
      return this.syntheticScanService.run(url);
    } catch (error) {
      throw new Error(`Unable to scan URL ${url}`);
    }
  }
}
