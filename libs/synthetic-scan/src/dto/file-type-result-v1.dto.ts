import { Expose } from 'class-transformer';

export class FileTypeResultV1Dto {
  @Expose()
  count: number;

  @Expose()
  estimatedCo2: number;

  @Expose()
  totalBytes: number;

  @Expose()
  totalBytesFormatted: string;
}
