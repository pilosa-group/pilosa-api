import { Controller, Get, Param, ParseUUIDPipe, Query } from '@nestjs/common';
import { OrganizationService } from '@app/project/organization.service';
import { Organization } from '@app/project/entities/organization.entity';
import { PaginatorService } from '@app/api';
import { PaginatorOptionsDto } from '@app/api/paginator-options.dto';
import { PaginatorDto } from '@app/api/paginator.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { OrganizationDto } from '@app/project/dto/organization.dto';
import { TransformerService } from '@app/api/transformer.service';
import { ApiPaginatedResponse } from '@app/api/openapi/decorators/api-paginated-response.decorator';

@ApiBearerAuth()
@ApiTags('Organizations')
@Controller('organizations')
export class OrganizationsController {
  constructor(
    private organizationService: OrganizationService,
    private paginatorService: PaginatorService,
    private transformerService: TransformerService,
  ) {}

  @Get('/')
  @ApiPaginatedResponse(OrganizationDto, {
    description: 'Get all organizations',
  })
  @ApiOperation({
    summary: 'Get all organizations',
    operationId: 'getOrganizations',
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
    type: OrganizationDto,
  })
  @ApiOperation({
    summary: 'Get an organization',
    operationId: 'getOrganization',
  })
  async getOrganization(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<OrganizationDto> {
    return this.transformerService.entityToDto<Organization, OrganizationDto>(
      await this.organizationService.findOne(id),
      OrganizationDto,
    );
  }
}
