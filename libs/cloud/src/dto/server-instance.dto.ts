import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ServerInstanceDto {
  @Expose()
  @ApiProperty({ type: 'string', format: 'uuid' })
  id: string;

  @Expose()
  @ApiProperty()
  name!: string;

  @Expose()
  @ApiProperty()
  class!: string;

  @Expose()
  @ApiProperty()
  state!: string;

  @Expose()
  @ApiProperty()
  instanceId!: string;
}
