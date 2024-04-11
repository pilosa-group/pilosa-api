import {
  Controller,
  Request,
  Post,
  UseGuards,
  forwardRef,
  Inject,
} from '@nestjs/common';
import { LocalAuthGuard } from '@app/auth/guards/local-auth.guard';
import { AuthService } from '@app/auth';

@Controller()
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
}
