import { OrganizationDto } from '@app/project/dto/organization.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

export class ProjectDto {
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
  @ApiProperty({
    type: () => OrganizationDto,
  })
  @Type(() => OrganizationDto)
  organization: OrganizationDto;

  @Expose()
  @ApiProperty({
    type: () => Date,
  })
  updatedAt: Date;
}
