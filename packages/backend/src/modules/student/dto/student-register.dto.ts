import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

export class StudentRegisterDto {
  @Expose()
  readonly student_id: number;

  @IsString()
  @IsNotEmpty()
  @Expose()
  name: string;

  @IsString()
  @IsNotEmpty()
  @Expose()
  ra: string;

  @IsNotEmpty()
  @Expose()
  cpf: string;

  @IsEmail()
  @Expose()
  email: string;

  constructor(partial: Partial<StudentRegisterDto>) {
    Object.assign(this, partial);
  }
}
