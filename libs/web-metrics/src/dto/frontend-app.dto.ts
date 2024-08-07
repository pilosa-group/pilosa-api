import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class FrontendAppDto {
  @Expose()
  @ApiProperty({ format: 'uuid', type: 'string' })
  id: string;

  @Expose()
  @ApiProperty()
  name!: string;

  @Expose()
  @ApiProperty({ format: 'domain', isArray: true, type: 'string' })
  urls!: string[];
}
