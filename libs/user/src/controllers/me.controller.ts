import { CurrentUser } from '@app/user/decorators/current-user.decorator';
import { UserDto } from '@app/user/dto/user';
import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Auth')
@Controller()
export class MeController {
  @Get('me')
  @ApiResponse({
    description: 'Get current user profile',
    status: 200,
    type: UserDto,
  })
  getProfile(@CurrentUser() user: UserDto): UserDto {
    return user;
  }
}
