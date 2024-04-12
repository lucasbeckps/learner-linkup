import { Test, TestingModule } from '@nestjs/testing';
import StudentController from '@backend/modules/student/student.controller';
import { StudentService } from '@backend/modules/student/student.service';
import { StudentRegisterDto } from '@backend/modules/student/dto/student-register.dto';
import { StudentEditDto } from '@backend/modules/student/dto/student-edit.dto';
import { StudentModel } from '@backend/models/student.entity';

describe('StudentController', () => {
  let controller: StudentController;
  let mockStudentService: Partial<StudentService>;

  beforeEach(async () => {
    const mockQueryBuilder: any = {
      orderBy: jest.fn().mockReturnThis(),
      addOrderBy: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      orWhere: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      getMany: jest.fn().mockResolvedValue([]),
      getOne: jest.fn().mockResolvedValue(new StudentModel()),
    };

    mockStudentService = {
      getBaseQuery: jest.fn(() => mockQueryBuilder),
      applySearch: jest.fn(),
      paginate: jest.fn(),
      getTotalPages: jest.fn().mockResolvedValue(1),
      getStudents: jest.fn().mockResolvedValue([]),
      createStudent: jest.fn().mockImplementation((studentDto, userId) =>
        Promise.resolve({
          ...studentDto,
          student_id: 1,
          created_by: userId,
          updated_by: userId,
        }),
      ),
      editStudent: jest
        .fn()
        .mockImplementation((studentId, studentDto, userId) =>
          Promise.resolve({
            ...studentDto,
            student_id: studentId,
            updated_by: userId,
          }),
        ),
      deleteStudent: jest.fn().mockResolvedValue({ affected: 1 }),
      normalizeStudent: jest.fn().mockImplementation((student) => student),
      normalizeStudentList: jest
        .fn()
        .mockImplementation((students) => students),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentController],
      providers: [
        {
          provide: StudentService,
          useValue: mockStudentService,
        },
      ],
    }).compile();

    controller = module.get<StudentController>(StudentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getStudents', () => {
    it('should return students page response', async () => {
      const result = await controller.getStudents('searchQuery');
      expect(mockStudentService.getStudents).toHaveBeenCalled();
      expect(result).toEqual({
        totalPages: 1,
        students: [],
      });
    });
  });

  describe('createStudent', () => {
    it('should create a student', async () => {
      const studentDto: StudentRegisterDto = new StudentRegisterDto({
        name: 'John Doe',
        ra: 123456,
        cpf: '00011122233',
        email: 'john@example.com',
      });
      const user = { sub: 1 };
      const result = await controller.createStudent(studentDto, user);
      expect(mockStudentService.createStudent).toHaveBeenCalledWith(
        studentDto,
        user.sub,
      );
      expect(result).toEqual(
        expect.objectContaining({ name: studentDto.name }),
      );
    });
  });

  describe('editStudent', () => {
    it('should update a student', async () => {
      const studentEditDto: StudentEditDto = {
        student_id: 1,
        name: 'Jane Doe',
        email: 'jane@example.com',
      };
      const user = { sub: 2 };
      const studentId = 1;
      const result = await controller.editStudent(
        studentEditDto,
        studentId,
        user,
      );
      expect(mockStudentService.editStudent).toHaveBeenCalledWith(
        studentId,
        studentEditDto,
        user.sub,
      );
      expect(result).toEqual(
        expect.objectContaining({ name: studentEditDto.name }),
      );
    });
  });

  describe('deleteStudent', () => {
    it('should delete a student', async () => {
      const studentId = 1;
      const user = { sub: 3 };
      const result = await controller.deleteStudent(studentId, user);
      expect(mockStudentService.deleteStudent).toHaveBeenCalledWith(
        studentId,
        user.sub,
      );
      expect(result).toEqual({ affected: 1 });
    });
  });
});
