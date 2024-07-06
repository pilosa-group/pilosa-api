import { FileTypeResultV1Dto } from '@app/synthetic-scan/dto/file-type-result-v1.dto';
import { Expose, Type } from 'class-transformer';

export class FileTypeResultsV1Dto {
  @Expose()
  @Type(() => FileTypeResultV1Dto)
  audio?: FileTypeResultV1Dto;

  @Expose()
  @Type(() => FileTypeResultV1Dto)
  fonts?: FileTypeResultV1Dto;

  @Expose()
  @Type(() => FileTypeResultV1Dto)
  images?: FileTypeResultV1Dto;

  @Expose()
  @Type(() => FileTypeResultV1Dto)
  json?: FileTypeResultV1Dto;

  @Expose()
  @Type(() => FileTypeResultV1Dto)
  other?: FileTypeResultV1Dto;

  @Expose()
  @Type(() => FileTypeResultV1Dto)
  scripts?: FileTypeResultV1Dto;

  @Expose()
  @Type(() => FileTypeResultV1Dto)
  stylesheets?: FileTypeResultV1Dto;

  @Expose()
  @Type(() => FileTypeResultV1Dto)
  video?: FileTypeResultV1Dto;
}
