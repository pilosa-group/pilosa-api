import { Controller, Get, Param, ParseUUIDPipe, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ApiPaginatedResponse } from '@app/api/openapi/decorators/api-paginated-response.decorator';
import { ServerInstanceDto } from '@app/cloud/dto/server-instance.dto';
import { PaginatorDto } from '@app/api/paginator.dto';
import { Organization } from '@app/project/entities/organization.entity';
import { PaginatorService } from '@app/api';
import { PaginatorOptionsDto } from '@app/api/paginator-options.dto';
import { ServerInstance } from '@app/cloud/entities/server-instance.entity';
import { Project } from '@app/project/entities/project.entity';

@ApiBearerAuth()
@ApiTags('Infrastructure')
@Controller('servers')
export class ServersController {
  constructor(private paginatorService: PaginatorService) {}

  @Get('/:projectId')
  @ApiPaginatedResponse(ServerInstanceDto)
  async getAllServerInstances(
    @Query() paginatorOptions: PaginatorOptionsDto,
    @Param('projectId', ParseUUIDPipe) projectId: Project['id'],
  ): Promise<PaginatorDto<ServerInstanceDto>> {
    return this.paginatorService.findAll<ServerInstance, ServerInstanceDto>(
      [Organization.name, ServerInstanceDto],
      paginatorOptions,
      {
        cloudProviderAccount: {
          project: projectId,
        },
      },
    );
  }
}
