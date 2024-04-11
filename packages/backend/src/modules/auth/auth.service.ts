import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '@backend/modules/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(email);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.user_id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
