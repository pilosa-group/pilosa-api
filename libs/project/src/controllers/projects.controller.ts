import { PaginatorService } from '@app/api';
import { ApiPaginatedResponse } from '@app/api/openapi/decorators/api-paginated-response.decorator';
import { PaginatorDto } from '@app/api/paginator.dto';
import { PaginatorOptionsDto } from '@app/api/paginator-options.dto';
import { TransformerService } from '@app/api/transformer.service';
import { ProjectDto } from '@app/project/dto/project.dto';
import { Project } from '@app/project/entities/project.entity';
import { ProjectService } from '@app/project/project.service';
import { CurrentUser } from '@app/user/decorators/current-user.decorator';
import { UserDto } from '@app/user/dto/user.dto';
import { FrontendAppDto } from '@app/web-metrics/dto/frontend-app.dto';
import { FrontendApp } from '@app/web-metrics/entities/frontend-app.entity';
import {
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Organizations')
@Controller()
export class ProjectsController {
  constructor(
    private projectService: ProjectService,
    private paginatorService: PaginatorService,
    private transformerService: TransformerService,
  ) {}

  @Get('organizations/:organizationSlug/projects')
  @ApiPaginatedResponse(ProjectDto, {
    description: 'Get all projects',
  })
  @ApiOperation({
    operationId: 'getProjects',
    summary: 'Get all projects by organization',
  })
  async getAllProjects(
    @Param('organizationSlug') organizationSlug: string,
    @Query() paginatorOptions: PaginatorOptionsDto,
    @CurrentUser() user: UserDto,
  ): Promise<PaginatorDto<ProjectDto>> {
    return this.paginatorService.findAll<Project, ProjectDto>(
      [Project.name, ProjectDto],
      paginatorOptions,
      {
        members: {
          user: {
            id: user.id,
          },
        },
        organization: {
          slug: organizationSlug,
        },
      },
    );
  }

  @Get('projects/:slug/frontend-apps')
  @ApiPaginatedResponse(FrontendAppDto, {
    description: 'Get all frontend apps for a project',
  })
  @ApiOperation({
    operationId: 'getFrontendApps',
    summary: 'Get all frontend apps by project',
  })
  async getFrontendApps(
    @Param('slug') slug: string,
    @Query() paginatorOptions: PaginatorOptionsDto,
    @CurrentUser() user: UserDto,
  ): Promise<PaginatorDto<FrontendAppDto>> {
    return this.paginatorService.findAll<FrontendApp, FrontendAppDto>(
      [FrontendApp.name, FrontendAppDto],
      paginatorOptions,
      {
        project: {
          members: {
            user: {
              id: user.id,
            },
          },
          slug,
        },
      },
    );
  }

  @Get('projects/:slug')
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
    @Param('slug') slug: string,
    @CurrentUser() user: UserDto,
  ): Promise<ProjectDto> {
    const project = await this.projectService.findOne(slug, user);

    if (!project) {
      throw new NotFoundException();
    }

    return this.transformerService.entityToDto<Project, ProjectDto>(
      project,
      ProjectDto,
    );
  }
}
