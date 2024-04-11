import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserModel } from '@backend/models/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRegisterDto } from '@backend/modules/user/dto/user-register.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserModel)
    private userRepository: Repository<UserModel>,
  ) {}

  async findOne(email: string): Promise<UserModel | undefined> {
    return this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .getOneOrFail();
  }

  async create(user: UserRegisterDto): Promise<UserModel> {
    const userModel = new UserModel();

    userModel.email = user.email;
    userModel.password = await bcrypt.hash(user.password, 10);
    userModel.name = user.name;

    return this.userRepository.save(userModel);
  }
}
