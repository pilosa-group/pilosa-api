import { Controller, Get, Param, ParseUUIDPipe, Query } from '@nestjs/common';
import { OrganizationService } from '@app/project/organization.service';
import { Organization } from '@app/project/entities/organization.entity';
import { PaginatorService } from '@app/api';
import { PaginatorOptionsDto } from '@app/api/paginator-options.dto';
import { PaginatorDto } from '@app/api/paginator.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OrganizationDto } from '@app/project/dto/organization.dto';

@ApiBearerAuth()
@ApiTags('Organizations')
@Controller('organizations')
export class OrganizationsController {
  constructor(
    private organizationService: OrganizationService,
    private paginatorService: PaginatorService,
  ) {}

  @Get('/')
  @ApiResponse({
    status: 200,
    description: 'Get all organizations',
    type: PaginatorDto<OrganizationDto>,
  })
  async getAllOrganizations(
    @Query() paginatorOptions: PaginatorOptionsDto,
  ): Promise<PaginatorDto<OrganizationDto>> {
    return this.paginatorService.findAll<Organization, OrganizationDto>(
      [Organization.name, OrganizationDto],
      paginatorOptions,
    );
  }

  @Get('/:id')
  @ApiResponse({
    status: 200,
    description: 'Get an organization',
    type: Organization,
  })
  async getOrganization(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<Organization> {
    return this.organizationService.findOne(id);
  }
}
