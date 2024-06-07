import { Query, Resolver } from '@nestjs/graphql';
import { User } from '@app/user/entities/user.entity';
import { CurrentUser } from '@app/user/decorators/current-user.decorator';

@Resolver((of) => User)
export class MeResolver {
  @Query((returns) => User)
  me(@CurrentUser() currentUser: User): User {
    return currentUser;
  }
}
