import { PaginatorService } from '@app/api';
import { ApiPaginatedResponse } from '@app/api/openapi/decorators/api-paginated-response.decorator';
import { PaginatorDto } from '@app/api/paginator.dto';
import { PaginatorOptionsDto } from '@app/api/paginator-options.dto';
import { ProjectMemberDto } from '@app/project/dto/project-member.dto';
import { ProjectMember } from '@app/project/entities/project-member.entity';
import { CurrentUser } from '@app/user/decorators/current-user.decorator';
import { UserDto } from '@app/user/dto/user.dto';
import { Controller, Get, Param, ParseUUIDPipe, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Projects')
@Controller('projects/:projectId/members')
export class ProjectMembersController {
  constructor(private paginatorService: PaginatorService) {}

  @Get()
  @ApiPaginatedResponse(ProjectMemberDto, {
    description: 'Get all project members',
  })
  @ApiOperation({
    operationId: 'getProjectMembers',
    summary: 'Get all project members',
  })
  async getAllProjectMembers(
    @Param('projectId', ParseUUIDPipe) projectId: string,
    @Query() paginatorOptions: PaginatorOptionsDto,
    @CurrentUser() user: UserDto,
  ): Promise<PaginatorDto<ProjectMemberDto>> {
    return this.paginatorService.findAll<ProjectMember, ProjectMemberDto>(
      [ProjectMember.name, ProjectMemberDto],
      paginatorOptions,
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
}
