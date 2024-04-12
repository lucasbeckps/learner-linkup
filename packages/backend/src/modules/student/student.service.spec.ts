import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudentService } from './student.service';
import { StudentModel } from '@backend/models/student.entity';
import { StudentRegisterDto } from '@backend/modules/student/dto/student-register.dto';
import { StudentEditDto } from '@backend/modules/student/dto/student-edit.dto';

describe('StudentService', () => {
  let service: StudentService;
  let repo: Repository<StudentModel>;

  beforeEach(async () => {
    const mockQueryBuilder = {
      orderBy: jest.fn().mockReturnThis(),
      addOrderBy: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      orWhere: jest.fn().mockReturnThis(),
      update: jest.fn().mockReturnThis(),
      set: jest.fn().mockReturnThis(),
      execute: jest.fn().mockReturnThis(),
      getMany: jest.fn().mockResolvedValue([]),
      getOne: jest.fn().mockImplementation(async () => {
        const existingStudent = new StudentModel();
        existingStudent.student_id = 1;
        existingStudent.name = 'Original Name';
        existingStudent.email = 'original@example.com';
        existingStudent.ra = 1234;
        existingStudent.cpf = 'originalCPF';
        existingStudent.updated_by = 1;
        return existingStudent;
      }),
      softDelete: jest.fn().mockReturnThis(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentService,
        {
          provide: getRepositoryToken(StudentModel),
          useValue: {
            createQueryBuilder: jest.fn(() => mockQueryBuilder),
            save: jest.fn().mockImplementation(async (entity) => {
              return { ...entity };
            }),
          },
        },
      ],
    }).compile();

    service = module.get<StudentService>(StudentService);
    repo = module.get(getRepositoryToken(StudentModel));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createStudent', () => {
    it('should successfully create a student', async () => {
      const studentDto: StudentRegisterDto = {
        name: 'John Doe',
        ra: 123456,
        cpf: '00011122233',
        email: 'john@example.com',
      };
      const userId = 1;
      const result = await service.createStudent(studentDto, userId);
      expect(repo.save).toHaveBeenCalled();
      expect(result).toEqual(
        expect.objectContaining({
          name: studentDto.name,
          ra: studentDto.ra,
          cpf: studentDto.cpf,
          email: studentDto.email,
          created_by: userId,
          updated_by: userId,
        }),
      );
    });
  });

  describe('editStudent', () => {
    it('should update student details', async () => {
      const studentId = 1;
      const studentEditDto: StudentEditDto = {
        student_id: 1,
        name: 'Jane Doe',
        email: 'jane@example.com',
      };
      const userId = 2;
      const result = await service.editStudent(
        studentId,
        studentEditDto,
        userId,
      );
      expect(repo.createQueryBuilder().getOne).toHaveBeenCalled();
      expect(repo.save).toHaveBeenCalled();
      expect(result).toEqual(
        expect.objectContaining({
          student_id: 1,
          name: studentEditDto.name,
          email: studentEditDto.email,
          updated_by: userId,
        }),
      );
    });
  });

  describe('deleteStudent', () => {
    it('should delete a student', async () => {
      const studentId = 1;
      const userId = 3;
      await service.deleteStudent(studentId, userId);
      expect(repo.createQueryBuilder().update).toHaveBeenCalled();
      expect(repo.createQueryBuilder().softDelete).toHaveBeenCalled();
    });
  });
});
