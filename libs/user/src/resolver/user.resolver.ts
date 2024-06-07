import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { ProjectService } from '@app/project/project.service';
import { User } from '../entities/user.entity';
import { UserProjectRole } from '@app/project/entities/user-project-role.entity';

@Resolver((of) => User)
export class UserResolver {
  constructor(private readonly projectService: ProjectService) {}

  @ResolveField((returns) => [UserProjectRole], { nullable: 'items' })
  async projectRoles(@Parent() user: User): Promise<UserProjectRole[]> {
    return this.projectService.findAllForUser(user);
  }
}
