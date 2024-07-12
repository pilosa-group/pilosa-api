import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ProjectDto {
  @Expose()
  @ApiProperty({ format: 'uuid', type: 'string' })
  id: string;

  @Expose()
  @ApiProperty()
  name: string;

  @Expose()
  @ApiProperty()
  slug: string;
}
