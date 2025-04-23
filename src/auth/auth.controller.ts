import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Controller, Post, Headers, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './strategy/local.strategy';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('signUp')
  async signUp(@Headers('authorization') token: string) {
    return await this.authService.signUp(token);
  }

  @Post('login')
  async login(@Headers('authorization') token: string) {
    return await this.authService.login(token);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login/passport')
  async loginUsePassport(@Request() req) {
    return {
      refreshToken: await this.authService.issueToken(req.user, true),
      accessToken: await this.authService.issueToken(req.user, false),
    };
  }
}
