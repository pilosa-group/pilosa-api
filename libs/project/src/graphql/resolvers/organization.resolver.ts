import { forwardRef, Inject, NotFoundException } from '@nestjs/common';
import {
  Args,
  ID,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CurrentUser } from '@app/user/decorators/current-user.decorator';
import { User } from '@app/user/entities/user.entity';
import { Organization } from '@app/project/entities/organization.entity';
import { OrganizationService } from '@app/project/organization.service';
import { Project } from '@app/project/entities/project.entity';
import { ProjectService } from '@app/project/project.service';

@Resolver(() => Organization)
export class OrganizationResolver {
  constructor(
    @Inject(forwardRef(() => OrganizationService))
    private readonly organizationService: OrganizationService,
    @Inject(forwardRef(() => ProjectService))
    private readonly projectService: ProjectService,
  ) {}

  @Query(() => Organization)
  async organization(
    @Args('id', { type: () => ID }) id: string,
    @CurrentUser() currentUser: User,
  ): Promise<Organization> {
    const project = await this.organizationService.findById(id, currentUser);

    if (!project) {
      throw new NotFoundException();
    }

    return project;
  }

  @ResolveField(() => [Project])
  async projects(@Parent() organization: Organization): Promise<Project[]> {
    const project =
      await this.projectService.findAllByOrganization(organization);

    if (!project) {
      throw new NotFoundException();
    }

    return project;
  }
}
