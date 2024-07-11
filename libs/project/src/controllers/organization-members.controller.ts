import { PaginatorService } from '@app/api';
import { ApiPaginatedResponse } from '@app/api/openapi/decorators/api-paginated-response.decorator';
import { PaginatorDto } from '@app/api/paginator.dto';
import { PaginatorOptionsDto } from '@app/api/paginator-options.dto';
import { OrganizationDto } from '@app/project/dto/organization.dto';
import { OrganizationMemberDto } from '@app/project/dto/organization-member.dto';
import { OrganizationMember } from '@app/project/entities/organization-member.entity';
import { CurrentUser } from '@app/user/decorators/current-user.decorator';
import { UserDto } from '@app/user/dto/user.dto';
import { Controller, Get, Param, ParseUUIDPipe, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Organizations')
@Controller('organizations/:id/members')
export class OrganizationMembersController {
  constructor(private paginatorService: PaginatorService) {}

  @Get()
  @ApiPaginatedResponse(OrganizationDto, {
    description: 'Get all organization members',
  })
  @ApiOperation({
    operationId: 'getOrganizationMembers',
    summary: 'Get all organization members',
  })
  async getAllOrganizationsMembers(
    @Param('id', ParseUUIDPipe) id: string,
    @Query() paginatorOptions: PaginatorOptionsDto,
    @CurrentUser() user: UserDto,
  ): Promise<PaginatorDto<OrganizationMemberDto>> {
    return this.paginatorService.findAll<
      OrganizationMember,
      OrganizationMemberDto
    >([OrganizationMember.name, OrganizationMemberDto], paginatorOptions, {
      organization: {
        id,
        members: {
          user: {
            id: user.id,
          },
        },
      },
    });
  }
}
