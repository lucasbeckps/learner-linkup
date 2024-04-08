import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  UseInterceptors,
} from '@nestjs/common';
import { StudentService } from '@backend/modules/student/student.service';
import { StudentResponseDto } from '@backend/modules/student/dto/student-response.dto';

@Controller('students')
export default class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async getStudents(): Promise<StudentResponseDto[]> {
    const students = await this.studentService.getStudents();
    return this.studentService.normalizeStudentList(students);
  }
}
