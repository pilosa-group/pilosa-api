import { CurrentUser } from '@app/user/decorators/current-user.decorator';
import { UserDto } from '@app/user/dto/user.dto';
import { Controller, Get } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Auth')
@Controller()
export class MeController {
  @Get('me')
  @ApiResponse({
    description: 'Get user profile of authenticated user',
    status: 200,
    type: UserDto,
  })
  @ApiOperation({
    operationId: 'getProfile',
    summary: 'Get user profile of authenticated user',
  })
  getProfile(@CurrentUser() user: UserDto): UserDto {
    return user;
  }
}
