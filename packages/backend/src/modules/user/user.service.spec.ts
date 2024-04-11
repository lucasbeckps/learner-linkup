import * as bcrypt from 'bcrypt';

jest.mock('bcrypt', () => ({
  hash: jest.fn().mockResolvedValue('hashedPassword'),
}));

import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserModel } from '@backend/models/user.entity';

describe('UserService', () => {
  let service: UserService;
  let mockUserRepository;

  const mockUser = {
    user_id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    password: 'hashedPassword',
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
    students: [],
  };

  beforeEach(async () => {
    mockUserRepository = {
      createQueryBuilder: jest.fn(() => ({
        where: jest.fn().mockReturnThis(),
        getOneOrFail: jest.fn().mockResolvedValue(mockUser),
      })),
      save: jest
        .fn()
        .mockImplementation((user) =>
          Promise.resolve({ ...user, user_id: Date.now() }),
        ),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserModel),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  describe('findOne', () => {
    it('should throw an error if no user is found', async () => {
      mockUserRepository.createQueryBuilder.mockReturnValue({
        where: jest.fn().mockReturnThis(),
        getOneOrFail: jest.fn().mockRejectedValue(new Error('Not Found')),
      });

      await expect(service.findOne('notfound@email.com')).rejects.toThrow(
        'Not Found',
      );
    });
  });

  describe('create', () => {
    it('should successfully create a user', async () => {
      const userDto = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'Password@1',
      };
      const hashedPassword = 'hashedPassword';
      const savedUser = {
        ...userDto,
        password: hashedPassword,
        user_id: expect.any(Number),
      };

      mockUserRepository.save.mockResolvedValue(savedUser);

      const result = await service.create(userDto);
      expect(result).toEqual(savedUser);
      expect(bcrypt.hash).toHaveBeenCalledWith(userDto.password, 10);
    });
  });
});
