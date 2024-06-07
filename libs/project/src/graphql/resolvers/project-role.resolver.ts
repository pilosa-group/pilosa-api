import { forwardRef, Inject, NotFoundException } from '@nestjs/common';
import {
  Args,
  ID,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import {
  Project,
  Project as ProjectEntity,
} from '@app/project/entities/project.entity';
import { ProjectService } from '@app/project/project.service';
import { UserProjectRole } from '@app/project/entities/user-project-role.entity';

@Resolver((of) => UserProjectRole)
export class ProjectRoleResolver {
  constructor(
    @Inject(forwardRef(() => ProjectService))
    private readonly projectService: ProjectService,
  ) {}

  @ResolveField((returns) => Project)
  async project(
    @Parent() projectRole: UserProjectRole,
  ): Promise<ProjectEntity> {
    const project = await this.projectService.findOne(projectRole.projectId);

    if (!project) {
      throw new NotFoundException(projectRole.projectId);
    }

    return project;
  }
}
