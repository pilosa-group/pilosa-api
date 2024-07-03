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

@ApiBearerAuth()
@ApiTags('Organizations')
@Controller('')
export class ProjectsController {
  constructor(
    private projectService: ProjectService,
    private paginatorService: PaginatorService,
  ) {}

  @Get('organizations/:organizationId/projects')
  @ApiResponse({
    status: 200,
    description: 'Get all projects',
    type: PaginatorDto<Project>,
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
    type: Project,
  })
  async getProject(@Param('id', ParseUUIDPipe) id: string): Promise<Project> {
    return this.projectService.findOne(id);
  }

  @Get('projects/:projectId/frontend-apps')
  @ApiResponse({
    status: 200,
    description: 'Get all frontend apps for a project',
    type: PaginatorDto<FrontendApp>,
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
