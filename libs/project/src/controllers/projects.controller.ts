import { Controller, Get, Param, Query } from '@nestjs/common';
import {
  PaginatorInput,
  PaginatorResult,
} from '@app/web-metrics/browser-metrics.controller';
import { ProjectService } from '@app/project/project.service';
import { Project } from '@app/project/entities/project.entity';
import { FrontendAppService } from '@app/web-metrics/frontend-app.service';
import { FrontendApp } from '@app/web-metrics/entities/frontend-app.entity';

@Controller('')
export class ProjectsController {
  constructor(
    private projectService: ProjectService,
    private frontendAppService: FrontendAppService,
  ) {}

  @Get('organizations/:organizationId/projects')
  async getAllProjects(
    @Param('organizationId') organizationId: string,
    @Query() { limit = 100, offset = 0 }: PaginatorInput,
  ): Promise<PaginatorResult<Project>> {
    const projects = await this.projectService.findAll(organizationId);

    return {
      items: projects,
      pagination: {
        total: projects.length,
        limit,
        offset,
      },
    };
  }

  @Get('projects/:id')
  async getProject(@Param('id') id: string): Promise<Project> {
    return this.projectService.findOne(id);
  }

  @Get('projects/:id/frontend-apps')
  async getFrontendApps(
    @Param('id') id: string,
  ): Promise<PaginatorResult<FrontendApp>> {
    const apps = await this.frontendAppService.findByProject(id);

    return {
      items: apps,
      pagination: {
        total: apps.length,
        limit: 100,
        offset: 0,
      },
    };
  }
}
