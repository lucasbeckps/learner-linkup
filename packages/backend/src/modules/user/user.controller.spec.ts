import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from '@backend/modules/user/user.service';
import { UserRegisterDto } from '@backend/modules/user/dto/user-register.dto';
import { BadRequestException } from '@nestjs/common';

const mockUserService = {
  create: jest.fn((dto) => {
    return {
      ...dto,
      id: Date.now(),
    };
  }),
};

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user and return that', async () => {
      const userDto: UserRegisterDto = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'Password@1',
      };
      expect(await controller.create(userDto)).toEqual({
        ...userDto,
        id: expect.any(Number),
      });

      expect(service.create).toHaveBeenCalledWith(userDto);
    });

    it('should throw an error if the input validation fails', async () => {
      const userDto: UserRegisterDto = {
        name: '',
        email: 'invalid-email',
        password: 'pass',
      };

      mockUserService.create.mockImplementationOnce(() => {
        throw new BadRequestException('Input data validation failed');
      });

      await expect(controller.create(userDto)).rejects.toThrow(
        BadRequestException,
      );

      expect(service.create).toHaveBeenCalledWith(userDto);
    });
  });
});
