import { PaginatorService } from '@app/api';
import { ApiPaginatedResponse } from '@app/api/openapi/decorators/api-paginated-response.decorator';
import { PaginatorDto } from '@app/api/paginator.dto';
import { PaginatorOptionsDto } from '@app/api/paginator-options.dto';
import { TransformerService } from '@app/api/transformer.service';
import { OrganizationDto } from '@app/project/dto/organization.dto';
import { Organization } from '@app/project/entities/organization.entity';
import { OrganizationService } from '@app/project/organization.service';
import { CurrentUser } from '@app/user/decorators/current-user.decorator';
import { UserDto } from '@app/user/dto/user.dto';
import {
  Controller,
  Get,
  NotFoundException,
  Param,
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
    operationId: 'getOrganizations',
    summary: 'Get all organizations',
  })
  async getAllOrganizations(
    @Query() paginatorOptions: PaginatorOptionsDto,
    @CurrentUser() user: UserDto,
  ): Promise<PaginatorDto<OrganizationDto>> {
    return this.paginatorService.findAll<Organization, OrganizationDto>(
      [Organization.name, OrganizationDto],
      paginatorOptions,
      {
        members: {
          user: {
            id: user.id,
          },
        },
      },
    );
  }

  @Get(':slug')
  @ApiResponse({
    description: 'Get an organization',
    status: 200,
    type: OrganizationDto,
  })
  @ApiOperation({
    operationId: 'getOrganization',
    summary: 'Get an organization',
  })
  async getOrganization(
    @Param('slug') id: string,
    @CurrentUser() user: UserDto,
  ): Promise<OrganizationDto> {
    const organization = await this.organizationService.findOne(id, user);

    if (!organization) {
      throw new NotFoundException();
    }

    return this.transformerService.entityToDto<Organization, OrganizationDto>(
      organization,
      OrganizationDto,
    );
  }
}
