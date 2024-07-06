import { PaginatorService } from '@app/api';
import { ApiPaginatedResponse } from '@app/api/openapi/decorators/api-paginated-response.decorator';
import { PaginatorDto } from '@app/api/paginator.dto';
import { PaginatorOptionsDto } from '@app/api/paginator-options.dto';
import { TransformerService } from '@app/api/transformer.service';
import { ProjectDto } from '@app/project/dto/project.dto';
import { Project } from '@app/project/entities/project.entity';
import { ProjectService } from '@app/project/project.service';
import { FrontendAppDto } from '@app/web-metrics/dto/frontend-app.dto';
import { FrontendApp } from '@app/web-metrics/entities/frontend-app.entity';
import { Controller, Get, Param, ParseUUIDPipe, Query } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Organizations')
@Controller('')
export class ProjectsController {
  constructor(
    private projectService: ProjectService,
    private paginatorService: PaginatorService,
    private transformerService: TransformerService,
  ) {}

  @Get('organizations/:organizationId/projects')
  @ApiPaginatedResponse(ProjectDto, {
    description: 'Get all projects',
  })
  @ApiOperation({
    operationId: 'getProjects',
    summary: 'Get all projects by organization',
  })
  async getAllProjects(
    @Param('organizationId', ParseUUIDPipe) organization: string,
    @Query() paginatorOptions: PaginatorOptionsDto,
  ): Promise<PaginatorDto<ProjectDto>> {
    return this.paginatorService.findAll<Project, ProjectDto>(
      [Project.name, ProjectDto],
      paginatorOptions,
      {
        organization,
      },
    );
  }

  @Get('projects/:projectId/frontend-apps')
  @ApiPaginatedResponse(FrontendAppDto, {
    description: 'Get all frontend apps for a project',
  })
  @ApiOperation({
    operationId: 'getFrontendApps',
    summary: 'Get all frontend apps by project',
  })
  async getFrontendApps(
    @Param('projectId', ParseUUIDPipe) projectId: string,
    @Query() paginatorOptions: PaginatorOptionsDto,
  ): Promise<PaginatorDto<FrontendAppDto>> {
    return this.paginatorService.findAll<FrontendApp, FrontendAppDto>(
      [FrontendApp.name, FrontendAppDto],
      paginatorOptions,
      {
        project: projectId,
      },
    );
  }

  @Get('projects/:id')
  @ApiResponse({
    description: 'Get a project',
    status: 200,
    type: ProjectDto,
  })
  @ApiOperation({
    operationId: 'getProject',
    summary: 'Get a project',
  })
  async getProject(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ProjectDto> {
    return this.transformerService.entityToDto<Project, ProjectDto>(
      await this.projectService.findOne(id),
      ProjectDto,
    );
  }
}
