import { forwardRef, Inject } from '@nestjs/common';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { UserOrganizationRole } from '@app/project/entities/user-organization-role.entity';
import { OrganizationService } from '@app/project/organization.service';
import { Organization } from '@app/project/entities/organization.entity';

@Resolver(() => UserOrganizationRole)
export class OrganizationRoleResolver {
  constructor(
    @Inject(forwardRef(() => OrganizationService))
    private readonly organizationService: OrganizationService,
  ) {}

  @ResolveField(() => Organization)
  async organization(
    @Parent() organizationRole: UserOrganizationRole,
  ): Promise<Organization> {
    return this.organizationService.findByUserRole(organizationRole);
  }
}
