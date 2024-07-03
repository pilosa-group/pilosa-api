import { Entity } from '@mikro-orm/core';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class FrontendAppDto {
  @Expose()
  @ApiProperty({ type: 'string', format: 'uuid' })
  id: string;

  @Expose()
  @ApiProperty()
  name!: string;

  @Expose()
  @ApiProperty({ type: 'string', format: 'domain', isArray: true })
  urls!: string[];
}
