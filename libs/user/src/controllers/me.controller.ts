import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDto } from '@app/user/dto/user';
import { CurrentUser } from '@app/user/decorators/current-user.decorator';

@ApiBearerAuth()
@ApiTags('Auth')
@Controller()
export class MeController {
  @Get('me')
  @ApiResponse({
    status: 200,
    description: 'Get current user profile',
    type: UserDto,
  })
  getProfile(@CurrentUser() user: UserDto): UserDto {
    return user;
  }
}
