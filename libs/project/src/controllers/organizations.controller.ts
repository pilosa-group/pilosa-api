import { PaginatorService } from '@app/api';
import { ApiPaginatedResponse } from '@app/api/openapi/decorators/api-paginated-response.decorator';
import { PaginatorDto } from '@app/api/paginator.dto';
import { PaginatorOptionsDto } from '@app/api/paginator-options.dto';
import { TransformerService } from '@app/api/transformer.service';
import { CreateOrganizationDto } from '@app/project/dto/create-organization.dto';
import { OrganizationDto } from '@app/project/dto/organization.dto';
import { ProjectDto } from '@app/project/dto/project.dto';
import { UpdateOrganizationDto } from '@app/project/dto/update-organization.dto';
import { Organization } from '@app/project/entities/organization.entity';
import { OrganizationRole } from '@app/project/enum/organization-role.enum';
import { OrganizationService } from '@app/project/organization.service';
import { CurrentUser } from '@app/user/decorators/current-user.decorator';
import { UserDto } from '@app/user/dto/user.dto';
import { wrap } from '@mikro-orm/postgresql';
import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
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
@Controller('organizations')
export class OrganizationsController {
  constructor(
    private organizationService: OrganizationService,
    private paginatorService: PaginatorService,
    private transformerService: TransformerService,
  ) {}

  @Post()
  @ApiResponse({
    description: 'Create an organization',
    status: HttpStatus.CREATED,
    type: OrganizationDto,
  })
  @ApiOperation({
    operationId: 'createOrganization',
    summary: 'Create an organization',
  })
  async createOrganization(
    @CurrentUser() currentUser: UserDto,
    @Body() createOrganizationDto: CreateOrganizationDto,
  ): Promise<OrganizationDto> {
    const organization = await this.organizationService.create(
      createOrganizationDto,
      {
        userDto: currentUser,
      },
    );

    await this.organizationService.save(organization);

    return this.transformerService.entityToDto<Organization, OrganizationDto>(
      organization,
      OrganizationDto,
    );
  }

  @Get()
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
      {
        ...paginatorOptions,
        orderBy: {
          name: 'ASC',
        },
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

  @Delete(':slug')
  @ApiResponse({
    description: 'Remove an organization',
    status: HttpStatus.ACCEPTED,
    type: ProjectDto,
  })
  @ApiOperation({
    operationId: 'removeOrganization',
    summary: 'Remove an organization',
  })
  async removeOrganization(
    @CurrentUser() user: UserDto,
    @Param('slug') slug: string,
  ): Promise<void> {
    await this.organizationService.remove(slug, user);
  }

  @Patch(':slug')
  @ApiResponse({
    description: 'Update an organization',
    status: HttpStatus.OK,
    type: OrganizationDto,
  })
  @ApiOperation({
    operationId: 'updateOrganization',
    summary: 'Update an organization',
  })
  async updateOrganization(
    @Param('slug') slug: string,
    @CurrentUser() currentUser: UserDto,
    @Body() updateOrganizationDto: UpdateOrganizationDto,
  ): Promise<OrganizationDto> {
    const organization = await this.organizationService.findOne(
      slug,
      currentUser,
      [OrganizationRole.OWNER],
    );

    if (!organization) {
      throw new ForbiddenException();
    }

    wrap(organization).assign(updateOrganizationDto);

    organization.slug = this.organizationService.slugify(organization.name);

    await this.organizationService.save(organization);

    return this.transformerService.entityToDto<Organization, OrganizationDto>(
      organization,
      OrganizationDto,
    );
  }
}
