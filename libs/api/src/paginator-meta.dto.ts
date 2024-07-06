import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class PaginatorMetaDto {
  @ApiProperty()
  @Expose()
  limit: number;

  @Expose()
  @ApiProperty()
  offset: number;

  @ApiProperty()
  @Expose()
  total: number;
}
