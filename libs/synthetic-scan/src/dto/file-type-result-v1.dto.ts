import { Expose } from 'class-transformer';

export class FileTypeResultV1Dto {
  @Expose()
  count: number;

  @Expose()
  totalBytes: number;

  @Expose()
  totalBytesFormatted: string;

  @Expose()
  estimatedCo2: number;
}
