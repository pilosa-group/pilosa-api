import { forwardRef, Inject, NotFoundException } from '@nestjs/common';
import {
  Args,
  ID,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Project } from '@app/project/entities/project.entity';
import { ProjectService } from '@app/project/project.service';
import { CurrentUser } from '@app/user/decorators/current-user.decorator';
import { User } from '@app/user/entities/user.entity';
import { FrontendApp } from '@app/web-metrics/entities/frontend-app.entity';
import { FrontendAppService } from '@app/web-metrics/frontend-app.service';
import { CloudProviderAccount } from '@app/cloud/entities/cloud-provider-account.entity';
import { CloudProviderAccountService } from '@app/cloud/cloud-provider-account.service';

@Resolver((of) => Project)
export class ProjectResolver {
  constructor(
    @Inject(forwardRef(() => ProjectService))
    private readonly projectService: ProjectService,
    @Inject(forwardRef(() => FrontendAppService))
    private readonly frontendAppService: FrontendAppService,
    @Inject(forwardRef(() => CloudProviderAccountService))
    private readonly cloudProviderAccountService: CloudProviderAccountService,
  ) {}

  @Query((returns) => Project)
  async project(
    @Args('id', { type: () => ID }) id: string,
    @CurrentUser() currentUser: User,
  ): Promise<Project> {
    const project = await this.projectService.findById(id, currentUser);

    if (!project) {
      throw new NotFoundException();
    }

    return project;
  }

  @ResolveField((returns) => [FrontendApp])
  async frontendApps(@Parent() project: Project): Promise<FrontendApp[]> {
    return this.frontendAppService.findAllByProject(project);
  }

  @ResolveField((returns) => [CloudProviderAccount])
  async cloudProviderAccounts(
    @Parent() project: Project,
  ): Promise<CloudProviderAccount[]> {
    return this.cloudProviderAccountService.findAllByProject(project);
  }
}
