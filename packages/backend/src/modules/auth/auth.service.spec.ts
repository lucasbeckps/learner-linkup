import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '@backend/modules/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserModel } from '@backend/models/user.entity';

jest.mock('@backend/modules/user/user.service');
jest.mock('@nestjs/jwt');
jest.mock('bcrypt');

describe('AuthService', () => {
  let service: AuthService;
  let userService: jest.Mocked<UserService>;
  let jwtService: jest.Mocked<JwtService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get(UserService);
    jwtService = module.get(JwtService);

    userService.findOne.mockClear();
    jwtService.signAsync.mockClear();
    (bcrypt.compare as jest.Mock).mockClear();
  });

  describe('signIn', () => {
    it('should return a valid access token on correct credentials', async () => {
      const user: UserModel = {
        user_id: 1,
        email: 'test@example.com',
        password: 'hashedpassword',
        name: 'Test User',
        students: [],
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      };
      userService.findOne.mockResolvedValue(user);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      jwtService.signAsync.mockResolvedValue('valid-jwt-token');

      const result = await service.signIn('test@example.com', 'password');
      expect(result).toEqual({ access_token: 'valid-jwt-token' });
      expect(userService.findOne).toHaveBeenCalledWith('test@example.com');
      expect(bcrypt.compare).toHaveBeenCalledWith('password', user.password);
    });

    it('should throw UnauthorizedException if user is not found', async () => {
      userService.findOne.mockRejectedValue(new Error());
      await expect(
        service.signIn('wrong@example.com', 'password'),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException if password is incorrect', async () => {
      const user: UserModel = {
        user_id: 1,
        email: 'test@example.com',
        password: 'hashedpassword',
        name: 'Test User',
        students: [],
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      };
      userService.findOne.mockResolvedValue(user);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(
        service.signIn('test@example.com', 'wrongpassword'),
      ).rejects.toThrow(UnauthorizedException);
    });
  });
});
