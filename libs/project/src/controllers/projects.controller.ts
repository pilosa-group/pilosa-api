import { Controller, Get, Param, ParseUUIDPipe, Query } from '@nestjs/common';
import { ProjectService } from '@app/project/project.service';
import { Project } from '@app/project/entities/project.entity';
import { FrontendApp } from '@app/web-metrics/entities/frontend-app.entity';
import { PaginatorService } from '@app/api';
import { PaginatorOptionsDto } from '@app/api/paginator-options.dto';
import { PaginatorDto } from '@app/api/paginator.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FrontendAppDto } from '@app/web-metrics/dto/frontend-app.dto';
import { ProjectDto } from '@app/project/dto/project.dto';
import { TransformerService } from '@app/api/transformer.service';

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
  @ApiResponse({
    status: 200,
    description: 'Get all projects',
    type: PaginatorDto<ProjectDto>,
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

  @Get('projects/:id')
  @ApiResponse({
    status: 200,
    description: 'Get a project',
    type: ProjectDto,
  })
  async getProject(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ProjectDto> {
    return this.transformerService.entityToDto<Project, ProjectDto>(
      await this.projectService.findOne(id),
      ProjectDto,
    );
  }

  @Get('projects/:projectId/frontend-apps')
  @ApiResponse({
    status: 200,
    description: 'Get all frontend apps for a project',
    type: PaginatorDto<FrontendAppDto>,
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
}