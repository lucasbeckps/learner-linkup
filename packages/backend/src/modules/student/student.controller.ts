import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { StudentService } from '@backend/modules/student/student.service';
import { StudentResponseDto } from '@backend/modules/student/dto/student-response.dto';
import { StudentRegisterDto } from '@backend/modules/student/dto/student-register.dto';
import { StudentEditDto } from '@backend/modules/student/dto/student-edit.dto';
import { GetAuthUser } from '@backend/modules/user/get-auth-user.decorator';
import { StudentPageResponseDto } from '@backend/modules/student/dto/student-page-response.dto';

@Controller('students')
export default class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async getStudents(
    @Query('search') search,
    @Query('page') page = 1,
  ): Promise<StudentPageResponseDto> {
    const qb = this.studentService.getBaseQuery();
    this.studentService.applySearch(qb, search);

    const totalPages = await this.studentService.getTotalPages(qb);
    this.studentService.paginate(qb, page);
    const students = await this.studentService.getStudents(qb);

    return {
      students: this.studentService.normalizeStudentList(students),
      totalPages,
    };
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createStudent(
    @Body() student: StudentRegisterDto,
    @GetAuthUser() user,
  ): Promise<StudentResponseDto> {
    const createdStudent = await this.studentService.createStudent(
      student,
      user.sub,
    );
    return this.studentService.normalizeStudent(createdStudent);
  }

  @Put(':studentId')
  @UsePipes(ValidationPipe)
  async editStudent(
    @Body() student: StudentEditDto,
    @Param('studentId') studentId: number,
    @GetAuthUser() user,
  ): Promise<StudentResponseDto> {
    const editedStudent = await this.studentService.editStudent(
      studentId,
      student,
      user.sub,
    );
    return this.studentService.normalizeStudent(editedStudent);
  }

  @Delete(':studentId')
  deleteStudent(@Param('studentId') studentId: number, @GetAuthUser() user) {
    return this.studentService.deleteStudent(studentId, user.sub);
  }
}
