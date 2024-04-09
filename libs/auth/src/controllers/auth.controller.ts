import {
  Controller,
  Request,
  Post,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
  forwardRef,
  Inject,
  Get,
} from '@nestjs/common';
import { LocalAuthGuard } from '@app/auth/guards/local-auth.guard';
import { AuthService } from '@app/auth';
import { JwtAuthGuard } from '@app/auth/guards/jwt-auth.guard';

@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
