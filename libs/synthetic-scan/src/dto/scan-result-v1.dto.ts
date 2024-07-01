import { Expose, Type } from 'class-transformer';
import { HostingV1Dto } from '@app/synthetic-scan/dto/hosting-v1.dto';
import { FileTypeResultsV1Dto } from '@app/synthetic-scan/dto/file-type-results-v1.dto';

export class ScanResultV1Dto {
  @Expose()
  domain: string | null;

  @Expose()
  pageTitle: string;

  @Expose()
  numberOfRequests: number;

  @Expose()
  @Type(() => HostingV1Dto)
  hosting: HostingV1Dto[];

  @Expose()
  time?: {
    domReady: number;
    load: number;
    networkIdle: number;
  };

  @Expose()
  totalBytes: number;

  @Expose()
  totalBytesFormatted: string;

  @Expose()
  estimatedCo2: number;

  @Expose()
  cdnPercentage: number;

  @Expose()
  compressedPercentage: number;

  @Expose()
  cachePercentage: number;

  @Expose()
  @Type(() => FileTypeResultsV1Dto)
  fileTypes: FileTypeResultsV1Dto;
}
