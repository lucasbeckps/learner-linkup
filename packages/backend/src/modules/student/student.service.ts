import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { StudentModel } from '@backend/models/student.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentResponseDto } from '@backend/modules/student/dto/student-response.dto';
import { StudentRegisterDto } from '@backend/modules/student/dto/student-register.dto';
import { StudentEditDto } from '@backend/modules/student/dto/student-edit.dto';

const ITEMS_PER_PAGE = 20;

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(StudentModel)
    private readonly studentRepository: Repository<StudentModel>,
  ) {}

  getBaseQuery() {
    return this.studentRepository
      .createQueryBuilder('student')
      .addOrderBy('student_id', 'DESC');
  }

  paginate(qb, page) {
    return qb
      .orderBy('created_at', 'DESC')
      .offset((page - 1) * ITEMS_PER_PAGE)
      .limit(ITEMS_PER_PAGE);
  }

  getTotalPages(qb) {
    return qb.getCount().then((count) => Math.ceil(count / ITEMS_PER_PAGE));
  }

  applySearch(qb, search) {
    if (search) {
      const nomalizedSearch = search
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-zA-Z0-9]/g, '');

      qb.where('normalize_string(student.name) ILIKE :search', {
        search: `%${search}%`,
      });

      qb.orWhere('normalize_string(student.ra) ILIKE :search', {
        search: `%${nomalizedSearch}%`,
      });

      qb.orWhere('normalize_string(student.cpf) ILIKE :search', {
        search: `%${nomalizedSearch}%`,
      });

      qb.orWhere('normalize_string(student.email) ILIKE :search', {
        search: `%${nomalizedSearch}%`,
      });
    }
  }

  getStudents(qb): Promise<StudentModel[]> {
    return qb.getMany();
  }

  normalizeStudentList(students: StudentModel[]): StudentResponseDto[] {
    return students.map((student) => this.normalizeStudent(student));
  }

  normalizeStudent(student: StudentModel): StudentResponseDto {
    return new StudentResponseDto(student);
  }

  async createStudent(
    student: StudentRegisterDto,
    userId: number,
  ): Promise<StudentModel> {
    const studentModel = new StudentModel();

    studentModel.name = student.name;
    studentModel.ra = student.ra;
    studentModel.cpf = student.cpf;
    studentModel.email = student.email;
    studentModel.created_by = userId;
    studentModel.updated_by = userId;

    return this.studentRepository.save(studentModel);
  }

  async editStudent(
    studentId: number,
    student: StudentEditDto,
    userId: number,
  ): Promise<StudentModel> {
    const studentModel = await this.studentRepository
      .createQueryBuilder('student')
      .where({ student_id: studentId })
      .getOne();

    studentModel.name = student.name;
    studentModel.email = student.email;
    studentModel.updated_by = userId;

    return this.studentRepository.save(studentModel);
  }

  async deleteStudent(studentId: number, userId) {
    await this.studentRepository
      .createQueryBuilder('student')
      .update({
        updated_by: userId,
      })
      .where({ student_id: studentId })
      .execute();
    return this.studentRepository
      .createQueryBuilder('student')
      .softDelete()
      .where({ student_id: studentId })
      .execute();
  }
}
