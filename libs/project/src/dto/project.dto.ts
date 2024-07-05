import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ProjectDto {
  @Expose()
  @ApiProperty({ type: 'string', format: 'uuid' })
  id: string;

  @Expose()
  @ApiProperty()
  name!: string;
}
