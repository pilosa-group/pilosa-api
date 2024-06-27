import { Controller, Get, Param, Query } from '@nestjs/common';
import { OrganizationService } from '@app/project/organization.service';
import { Organization } from '@app/project/entities/organization.entity';
import {
  PaginatorInput,
  PaginatorResult,
} from '@app/web-metrics/browser-metrics.controller';

@Controller('organizations')
export class OrganizationsController {
  constructor(private organizationService: OrganizationService) {}

  @Get('/')
  async getAllOrganizations(
    @Query() { limit = 100, offset = 0 }: PaginatorInput,
  ): Promise<PaginatorResult<Organization>> {
    const organizations = await this.organizationService.findAll();

    return {
      items: organizations,
      pagination: {
        total: organizations.length,
        limit,
        offset,
      },
    };
  }

  @Get('/:id')
  async getOrganization(@Param('id') id: string): Promise<Organization> {
    return this.organizationService.findOne(id);
  }
}
