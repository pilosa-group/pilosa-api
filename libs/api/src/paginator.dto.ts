import { PaginatorMetaDto } from '@app/api/paginator-meta.dto';
import { ServerInstanceDto } from '@app/cloud/dto/server-instance.dto';
import { OrganizationDto } from '@app/project/dto/organization.dto';
import { OrganizationMemberDto } from '@app/project/dto/organization-member.dto';
import { ProjectDto } from '@app/project/dto/project.dto';
import { ProjectMemberDto } from '@app/project/dto/project-member.dto';
import { CarbonEmissionMetricDto } from '@app/web-metrics/dto/carbon-emission-metric.dto';
import { FrontendAppDto } from '@app/web-metrics/dto/frontend-app.dto';
import { ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

export class PaginatorDto<T extends object> {
  @Expose()
  @ApiProperty({
    isArray: true,
    oneOf: [
      { $ref: getSchemaPath(OrganizationDto) },
      { $ref: getSchemaPath(OrganizationMemberDto) },
      { $ref: getSchemaPath(ProjectDto) },
      { $ref: getSchemaPath(ProjectMemberDto) },
      { $ref: getSchemaPath(ServerInstanceDto) },
      { $ref: getSchemaPath(FrontendAppDto) },
      { $ref: getSchemaPath(CarbonEmissionMetricDto) },
    ],
  })
  items!: T[];

  @Type(() => PaginatorMetaDto)
  @Expose()
  @ApiProperty({ type: () => PaginatorMetaDto })
  meta!: PaginatorMetaDto;

  constructor(items: T[], meta: PaginatorMetaDto) {
    this.meta = meta;
    this.items = items;
  }
}
