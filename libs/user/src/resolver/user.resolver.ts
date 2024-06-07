import { Args, ID, Int, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { UserProjectRoleService } from '@app/project/user-project-role.service';
import { User } from '../entities/user.entity';
import { UserProjectRole } from '@app/project/entities/user-project-role.entity';
import { Project } from '@app/project/entities/project.entity';
import { ProjectService } from '@app/project/project.service';
import { CurrentUser } from '@app/user/decorators/current-user.decorator';
import { NotFoundException } from '@nestjs/common';
import { UserOrganizationRole } from '@app/project/entities/user-organization-role.entity';
import { UserOrganizationRoleService } from '@app/project/user-organization-role.service';

@Resolver((of) => User)
export class UserResolver {
  constructor(
    private readonly projectService: ProjectService,
    private readonly userProjectRoleService: UserProjectRoleService,
    private readonly userOrganizationRoleService: UserOrganizationRoleService,
  ) {}

  @ResolveField((returns) => [UserProjectRole], { nullable: 'items' })
  async projectRoles(@Parent() user: User): Promise<UserProjectRole[]> {
    return this.userProjectRoleService.findAllForUser(user);
  }

  @ResolveField((returns) => Project)
  async project(
    @Args('id', { type: () => ID }) id: string,
    @CurrentUser() currentUser: User,
  ): Promise<Project | undefined> {
    const project = await this.projectService.findById(id, currentUser);

    if (!project) {
      throw new NotFoundException();
    }

    return project;
  }

  @ResolveField((returns) => [UserOrganizationRole], { nullable: 'items' })
  async organizationRoles(
    @Parent() user: User,
  ): Promise<UserOrganizationRole[]> {
    return this.userOrganizationRoleService.findAllForUser(user);
  }
}
