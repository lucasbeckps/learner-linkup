import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '@backend/modules/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<any> {
    let user;
    try {
      user = await this.userService.findOne(email);
    } catch (error) {
      throw new UnauthorizedException();
    }

    if (user && !(await bcrypt.compare(pass, user.password))) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.user_id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
