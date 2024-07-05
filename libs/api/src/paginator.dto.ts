import { ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { PaginatorMetaDto } from '@app/api/paginator-meta.dto';
import { Expose, Type } from 'class-transformer';
import { OrganizationDto } from '@app/project/dto/organization.dto';
import { ProjectDto } from '@app/project/dto/project.dto';
import { ServerInstanceDto } from '@app/cloud/dto/server-instance.dto';
import { FrontendAppDto } from '@app/web-metrics/dto/frontend-app.dto';
import { CarbonEmissionMetricDto } from '@app/web-metrics/dto/carbon-emission-metric.dto';

// export type PaginatorItemDto =
//   | OrganizationDto
//   | ProjectDto
//   | ServerInstanceDto
//   | FrontendAppDto
//   | CarbonEmissionMetricDto;

export class PaginatorDto<T extends object> {
  @Type(() => PaginatorMetaDto)
  @Expose()
  @ApiProperty({ type: () => PaginatorMetaDto })
  meta!: PaginatorMetaDto;

  @Expose()
  @ApiProperty({
    isArray: true,
    oneOf: [
      { $ref: getSchemaPath(OrganizationDto) },
      { $ref: getSchemaPath(ProjectDto) },
      { $ref: getSchemaPath(ServerInstanceDto) },
      { $ref: getSchemaPath(FrontendAppDto) },
      { $ref: getSchemaPath(CarbonEmissionMetricDto) },
    ],
  })
  items!: T[];

  constructor(items: T[], meta: PaginatorMetaDto) {
    this.meta = meta;
    this.items = items;
  }
}
