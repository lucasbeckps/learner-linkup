import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '@backend/modules/user/user.service';
import { Public } from '@backend/modules/auth/public.decorator';
import { UserRegisterDto } from '@backend/modules/user/dto/user-register.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post('create')
  async create(@Body() user: UserRegisterDto) {
    return this.userService.create(user);
  }
}
