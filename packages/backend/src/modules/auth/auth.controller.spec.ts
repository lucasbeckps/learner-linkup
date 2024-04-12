import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from '@backend/modules/auth/auth.service';
import { UserService } from '@backend/modules/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@backend/modules/auth/auth.guard';
import { Reflector } from '@nestjs/core';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserModel } from '@backend/models/user.entity';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: jest.Mocked<AuthService>;
  let userService: jest.Mocked<UserService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            signIn: jest.fn().mockResolvedValue({ accessToken: 'jwt-token' }),
          },
        },
        {
          provide: UserService,
          useValue: {
            findOne: jest.fn().mockResolvedValue({
              name: 'John Doe',
              email: 'user@example.com',
            }),
          },
        },
        {
          provide: JwtService,
          useValue: {},
        },
        {
          provide: getRepositoryToken(UserModel),
          useValue: {},
        },
        Reflector,
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get(AuthService);
    userService = module.get(UserService);
  });

  describe('signIn', () => {
    it('should return a token on valid sign in', async () => {
      const signInDto = { email: 'user@example.com', password: 'password123' };
      await expect(controller.signIn(signInDto)).resolves.toEqual({
        accessToken: 'jwt-token',
      });
      expect(authService.signIn).toHaveBeenCalledWith(
        signInDto.email,
        signInDto.password,
      );
    });
  });

  describe('getProfile', () => {
    it('should return user profile data', async () => {
      const req = {
        user: {
          email: 'user@example.com',
          userId: 1,
        },
      };
      await expect(controller.getProfile(req)).resolves.toEqual({
        name: 'John Doe',
        email: 'user@example.com',
        userId: req.user.userId,
      });
      expect(userService.findOne).toHaveBeenCalledWith(req.user.email);
    });
  });
});
