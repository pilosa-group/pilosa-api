import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserDto } from '@app/user/dto/user';
import { CurrentUser } from '@app/user/decorators/current-user.decorator';

@ApiBearerAuth()
@ApiTags('Auth')
@Controller()
export class MeController {
  @Get('me')
  getProfile(@CurrentUser() user: UserDto): UserDto {
    return user;
  }
}
