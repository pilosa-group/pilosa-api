import { Query, Resolver } from '@nestjs/graphql';
import { User } from '@app/user/entities/user.entity';
import { UserDTO } from '@app/user/dto/user';
import { CurrentUser } from '@app/user/decorators/current-user.decorator';

@Resolver((of) => User)
export class MeResolver {
  @Query((returns) => User)
  async me(@CurrentUser() currentUser: UserDTO): Promise<UserDTO> {
    return currentUser;
  }
}
