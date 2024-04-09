import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { StudentService } from '@backend/modules/student/student.service';
import { StudentResponseDto } from '@backend/modules/student/dto/student-response.dto';
import { StudentRegisterDto } from '@backend/modules/student/dto/student-register.dto';
import { StudentEditDto } from '@backend/modules/student/dto/student-edit.dto';

@Controller('students')
export default class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async getStudents(): Promise<StudentResponseDto[]> {
    const students = await this.studentService.getStudents();
    return this.studentService.normalizeStudentList(students);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createStudent(
    @Body() student: StudentRegisterDto,
  ): Promise<StudentResponseDto> {
    const createdStudent = await this.studentService.createStudent(student);
    return this.studentService.normalizeStudent(createdStudent);
  }

  @Put(':studentId')
  @UsePipes(ValidationPipe)
  async editStudent(
    @Body() student: StudentEditDto,
    @Param('studentId') studentId: number,
  ): Promise<StudentResponseDto> {
    const editedStudent = await this.studentService.editStudent(
      studentId,
      student,
    );
    return this.studentService.normalizeStudent(editedStudent);
  }

  @Delete(':studentId')
  deleteStudent(@Param('studentId') studentId: number) {
    return this.studentService.deleteStudent(studentId);
  }
}
