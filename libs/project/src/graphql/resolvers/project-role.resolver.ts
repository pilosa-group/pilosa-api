import { forwardRef, Inject } from '@nestjs/common';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import {
  Project,
  Project as ProjectEntity,
} from '@app/project/entities/project.entity';
import { UserProjectRole } from '@app/project/entities/user-project-role.entity';
import { ProjectService } from '@app/project/project.service';

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
    return this.projectService.findByUserRole(projectRole);
  }
}
