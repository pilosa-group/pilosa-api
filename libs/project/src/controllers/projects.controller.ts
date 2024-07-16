import { PaginatorService } from '@app/api';
import { ApiPaginatedResponse } from '@app/api/openapi/decorators/api-paginated-response.decorator';
import { PaginatorDto } from '@app/api/paginator.dto';
import { PaginatorOptionsDto } from '@app/api/paginator-options.dto';
import { TransformerService } from '@app/api/transformer.service';
import { CreateProjectDto } from '@app/project/dto/create-project.dto';
import { ProjectDto } from '@app/project/dto/project.dto';
import { UpdateProjectDto } from '@app/project/dto/update-project.dto';
import { Project } from '@app/project/entities/project.entity';
import { ProjectService } from '@app/project/project.service';
import { CurrentUser } from '@app/user/decorators/current-user.decorator';
import { UserDto } from '@app/user/dto/user.dto';
import { FrontendAppDto } from '@app/web-metrics/dto/frontend-app.dto';
import { FrontendApp } from '@app/web-metrics/entities/frontend-app.entity';
import { wrap } from '@mikro-orm/postgresql';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
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

  @Post('organizations/:organizationSlug/projects')
  @ApiResponse({
    description: 'Create a project',
    status: HttpStatus.CREATED,
    type: ProjectDto,
  })
  @ApiOperation({
    operationId: 'createProject',
    summary: 'Create a project',
  })
  async createProject(
    @Param('organizationSlug') organizationSlug: string,
    @CurrentUser() currentUser: UserDto,
    @Body() createProjectDto: CreateProjectDto,
  ): Promise<ProjectDto> {
    const project = await this.projectService.create(createProjectDto, {
      organizationSlug,
      userDto: currentUser,
    });

    await this.projectService.save(project);

    return this.transformerService.entityToDto<Project, ProjectDto>(
      project,
      ProjectDto,
    );
  }

  @Delete('projects/:id')
  @ApiResponse({
    description: 'Delete a project',
    status: HttpStatus.ACCEPTED,
    type: ProjectDto,
  })
  @ApiOperation({
    operationId: 'deleteProject',
    summary: 'Delete a project',
  })
  async deleteProject(
    @CurrentUser() user: UserDto,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<void> {
    await this.projectService.remove(id, user);
  }

  @Get('projects')
  @ApiPaginatedResponse(ProjectDto, {
    description: 'Get all projects',
  })
  @ApiOperation({
    operationId: 'getProjects',
    summary: 'Get all projects',
  })
  async getAllProjects(
    @Query() paginatorOptions: PaginatorOptionsDto,
    @CurrentUser() user: UserDto,
  ): Promise<PaginatorDto<ProjectDto>> {
    return this.paginatorService.findAll<Project, ProjectDto>(
      [Project.name, ProjectDto],
      {
        ...paginatorOptions,
        orderBy: {
          name: 'ASC',
        },
        populate: ['organization.slug'],
      },
      {
        members: {
          user: {
            id: user.id,
          },
        },
      },
    );
  }

  @Get('organizations/:organizationSlug/projects')
  @ApiPaginatedResponse(ProjectDto, {
    description: 'Get all projects',
  })
  @ApiOperation({
    operationId: 'getAllProjectsByOrganization',
    summary: 'Get all projects by organization',
  })
  async getAllProjectsByOrganization(
    @Param('organizationSlug') organizationSlug: string,
    @Query() paginatorOptions: PaginatorOptionsDto,
    @CurrentUser() user: UserDto,
  ): Promise<PaginatorDto<ProjectDto>> {
    return this.paginatorService.findAll<Project, ProjectDto>(
      [Project.name, ProjectDto],
      {
        ...paginatorOptions,
        orderBy: {
          name: 'ASC',
        },
        populate: ['organization.slug'],
      },
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
    @CurrentUser() user: UserDto,
  ): Promise<PaginatorDto<FrontendAppDto>> {
    return this.paginatorService.findAll<FrontendApp, FrontendAppDto>(
      [FrontendApp.name, FrontendAppDto],
      {
        ...paginatorOptions,
        orderBy: {
          name: 'ASC',
        },
      },
      {
        project: {
          id: projectId,
          members: {
            user: {
              id: user.id,
            },
          },
        },
      },
    );
  }

  @Get('projects/:id')
  @ApiResponse({
    description: 'Get a project',
    status: HttpStatus.OK,
    type: ProjectDto,
  })
  @ApiOperation({
    operationId: 'getProject',
    summary: 'Get a project',
  })
  async getProject(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() user: UserDto,
  ): Promise<ProjectDto> {
    const project = await this.projectService.findOne(id, user);

    if (!project) {
      throw new NotFoundException();
    }

    return this.transformerService.entityToDto<Project, ProjectDto>(
      project,
      ProjectDto,
    );
  }

  @Patch('projects/:id')
  @ApiResponse({
    description: 'Update a project',
    status: HttpStatus.OK,
    type: ProjectDto,
  })
  @ApiOperation({
    operationId: 'updateProject',
    summary: 'Update a project',
  })
  async updateProject(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() currentUser: UserDto,
    @Body() updateProjectDto: UpdateProjectDto,
  ): Promise<ProjectDto> {
    const project = await this.projectService.findOne(id, currentUser);

    wrap(project).assign(updateProjectDto);

    await this.projectService.save(project);

    return this.transformerService.entityToDto<Project, ProjectDto>(
      project,
      ProjectDto,
    );
  }
}
