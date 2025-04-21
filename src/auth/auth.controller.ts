import { AuthService } from './auth.service';
import { Controller, Post, Headers } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post()
  async signUp(@Headers('authorization') token: string) {
    return await this.authService.signUp(token);
  }
}
