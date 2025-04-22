import { AuthService } from './auth.service';
import { Controller, Post, Headers } from '@nestjs/common';

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
}
