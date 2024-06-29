import { ApiProperty } from '@nestjs/swagger';
import { PaginatorMetaDto } from '@app/api/paginator-meta.dto';
import { Expose, Type } from 'class-transformer';

export class PaginatorDto<T extends object> {
  @Type(() => PaginatorMetaDto)
  @Expose()
  @ApiProperty({ type: () => PaginatorMetaDto })
  meta!: PaginatorMetaDto;

  @Expose()
  @ApiProperty({ isArray: true })
  items!: T[];

  constructor(items: T[], meta: PaginatorMetaDto) {
    this.meta = meta;
    this.items = items;
  }
}
