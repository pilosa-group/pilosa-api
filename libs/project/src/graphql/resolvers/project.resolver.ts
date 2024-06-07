import { forwardRef, Inject, NotFoundException } from '@nestjs/common';
import { Args, ID, Parent, Query, Resolver } from '@nestjs/graphql';
import { ProjectService } from '@app/project/project.service';
import { Project } from '@app/project';

@Resolver((of) => Project)
export class ProjectResolver {
  constructor(private readonly projectService: ProjectService) {}
  @Query((returns) => Project, { nullable: true })
  async project(@Args('id', { type: () => ID }) id: string): Promise<Project> {
    const project = await this.projectService.findOne(id);

    if (!project) {
      throw new NotFoundException(id);
    }

    return project;
  }
}
