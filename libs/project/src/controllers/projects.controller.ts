import { Controller, Get, Param, ParseUUIDPipe, Query } from '@nestjs/common';
import { ProjectService } from '@app/project/project.service';
import { Project } from '@app/project/entities/project.entity';
import { FrontendApp } from '@app/web-metrics/entities/frontend-app.entity';
import { PaginatorService } from '@app/api';
import { PaginatorOptionsDto } from '@app/api/paginator-options.dto';
import { PaginatorDto } from '@app/api/paginator.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Organizations')
@Controller('')
export class ProjectsController {
  constructor(
    private projectService: ProjectService,
    private paginatorService: PaginatorService,
  ) {}

  @Get('organizations/:organizationId/projects')
  async getAllProjects(
    @Param('organizationId', ParseUUIDPipe) organization: string,
    @Query() paginatorOptions: PaginatorOptionsDto,
  ): Promise<PaginatorDto<Project>> {
    return this.paginatorService.findAll<Project>(
      Project.name,
      paginatorOptions,
      {
        organization,
      },
    );
  }

  @Get('projects/:id')
  async getProject(@Param('id', ParseUUIDPipe) id: string): Promise<Project> {
    return this.projectService.findOne(id);
  }

  @Get('projects/:projectId/frontend-apps')
  async getFrontendApps(
    @Param('projectId', ParseUUIDPipe) projectId: string,
    @Query() paginatorOptions: PaginatorOptionsDto,
  ): Promise<PaginatorDto<FrontendApp>> {
    return this.paginatorService.findAll<FrontendApp>(
      FrontendApp.name,
      paginatorOptions,
      {
        project: projectId,
      },
    );
  }
}
