import { AuthService } from './../auth.service';
import { Injectable } from '@nestjs/common';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

export class LocalAuthGuard extends AuthGuard('local') {}

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
    });
  }

  // LocalStrategy
  // validate : username, password를 꼭 넣어줘야한다.
  async validate(username: string, password: string) {
    const user = await this.authService.validate(username, password);

    return user;
  }
}
