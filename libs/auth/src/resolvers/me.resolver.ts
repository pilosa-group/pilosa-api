import { Query, Resolver } from '@nestjs/graphql';
import { User } from '@app/user/entities/user.entity';
import { CurrentUser } from '@app/user/decorators/current-user.decorator';

@Resolver(() => User)
export class MeResolver {
  @Query(() => User)
  me(@CurrentUser() currentUser: User): User {
    return currentUser;
  }
}
