import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super();
  }

  // LocalStrategy
  // validate : username, password를 꼭 넣어줘야한다.
  async validate(username: string, password: string) {}
}
