import { FileTypeResultsV1Dto } from '@app/synthetic-scan/dto/file-type-results-v1.dto';
import { HostingV1Dto } from '@app/synthetic-scan/dto/hosting-v1.dto';
import { Expose, Type } from 'class-transformer';

export class ScanResultV1Dto {
  @Expose()
  cachePercentage: number;

  @Expose()
  cdnPercentage: number;

  @Expose()
  compressedPercentage: number;

  @Expose()
  domain: null | string;

  @Expose()
  estimatedCo2: number;

  @Expose()
  @Type(() => FileTypeResultsV1Dto)
  fileTypes: FileTypeResultsV1Dto;

  @Expose()
  @Type(() => HostingV1Dto)
  hosting: HostingV1Dto[];

  @Expose()
  numberOfRequests: number;

  @Expose()
  pageTitle: string;

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
}
