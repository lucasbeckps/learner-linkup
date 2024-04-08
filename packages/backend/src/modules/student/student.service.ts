import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { StudentModel } from '@backend/models/student.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentResponseDto } from '@backend/modules/student/dto/student-response.dto';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(StudentModel)
    private readonly studentRepository: Repository<StudentModel>,
  ) {}

  getStudents(): Promise<StudentModel[]> {
    return this.studentRepository
      .createQueryBuilder('student')
      .orderBy('updated_at', 'DESC')
      .getMany();
  }

  normalizeStudentList(students: StudentModel[]): StudentResponseDto[] {
    return students.map((student) => this.normalizeStudent(student));
  }

  normalizeStudent(student: StudentModel): StudentResponseDto {
    return new StudentResponseDto(student);
  }
}
