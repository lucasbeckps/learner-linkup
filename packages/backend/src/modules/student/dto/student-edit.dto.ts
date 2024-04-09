import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

export class StudentEditDto {
  @Expose()
  readonly student_id: number;

  @IsString()
  @IsNotEmpty()
  @Expose()
  name: string;

  @IsString()
  @IsNotEmpty()
  @Expose()
  readonly ra: string;

  @IsNotEmpty()
  @Expose()
  readonly cpf: string;

  @IsEmail()
  @Expose()
  email: string;

  constructor(partial: Partial<StudentEditDto>) {
    Object.assign(this, partial);
  }
}
