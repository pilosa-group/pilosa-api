import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ServerInstanceDto {
  @Expose()
  @ApiProperty()
  class!: string;

  @Expose()
  @ApiProperty({ format: 'uuid', type: 'string' })
  id: string;

  @Expose()
  @ApiProperty()
  instanceId!: string;

  @Expose()
  @ApiProperty()
  name!: string;

  @Expose()
  @ApiProperty()
  state!: string;
}
