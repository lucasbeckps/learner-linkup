import { StudentResponseDto } from '@backend/modules/student/dto/student-response.dto';

export class StudentPageResponseDto {
  students: StudentResponseDto[];
  totalPages: number;
}
