import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class OrganizationDto {
  @Expose()
  @ApiProperty({ type: 'string', format: 'uuid' })
  id: string;

  @Expose()
  @ApiProperty()
  name: string;
}
