import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Request,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '@backend/modules/auth/auth.service';
import { AuthGuard } from '@backend/modules/auth/auth.guard';
import { Public } from '@backend/modules/auth/public.decorator';
import { UserService } from '@backend/modules/user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: Record<string, any>) {
    // Delay to prevent brute force attack
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @UseGuards(AuthGuard)
  @Get('me')
  async getProfile(@Request() req) {
    const user = await this.userService.findOne(req.user.email);
    return {
      name: user.name,
      ...req.user,
    };
  }
}
