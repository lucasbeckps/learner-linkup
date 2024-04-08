import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentModel } from '@backend/models/student.entity';
import StudentController from '@backend/modules/student/student.controller';
import { StudentService } from '@backend/modules/student/student.service';

@Module({
  imports: [TypeOrmModule.forFeature([StudentModel])],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
