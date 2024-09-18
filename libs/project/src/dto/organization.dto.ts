import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class OrganizationDto {
  @Expose()
  @ApiProperty({
    type: () => Date,
  })
  createdAt: Date;

  @Expose()
  @ApiProperty({ format: 'uuid', type: 'string' })
  id: string;

  @Expose()
  @ApiProperty()
  name: string;

  @Expose()
  @ApiProperty()
  slug: string;

  @Expose()
  @ApiProperty({
    type: () => Date,
  })
  updatedAt: Date;
}
