import { forwardRef, Inject, NotFoundException } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { Project } from '@app/project/graphql/models/project.model';
import { ProjectService } from '@app/project/project.service';

@Resolver((of) => Project)
export class ProjectsResolver {
  constructor(
    @Inject(forwardRef(() => ProjectService))
    private readonly projectService: ProjectService,
  ) {}

  @Query((returns) => Project)
  async project(@Args('id') id: string): Promise<Project> {
    const project = await this.projectService.findOne(id);

    if (!project) {
      throw new NotFoundException(id);
    }

    return project;
  }

  @Query((returns) => [Project])
  projects(): Promise<Project[]> {
    return this.projectService.findAll();
  }
}
