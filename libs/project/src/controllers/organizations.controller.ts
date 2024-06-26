import { Controller, Get, Param, ParseUUIDPipe, Query } from '@nestjs/common';
import { OrganizationService } from '@app/project/organization.service';
import { Organization } from '@app/project/entities/organization.entity';
import { PaginatorService } from '@app/api';
import { PaginatorOptionsDto } from '@app/api/paginator-options.dto';
import { PaginatorDto } from '@app/api/paginator.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Organizations')
@Controller('organizations')
export class OrganizationsController {
  constructor(
    private organizationService: OrganizationService,
    private paginatorService: PaginatorService,
  ) {}

  @Get('/')
  async getAllOrganizations(
    @Query() paginatorOptions: PaginatorOptionsDto,
  ): Promise<PaginatorDto<Organization>> {
    return this.paginatorService.findAll<Organization>(
      Organization.name,
      paginatorOptions,
    );
  }

  @Get('/:id')
  async getOrganization(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<Organization> {
    return this.organizationService.findOne(id);
  }
}
