import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

export class StudentResponseDto {
  @Expose()
  readonly student_id: number;

  @IsString()
  @IsNotEmpty()
  @Expose()
  readonly name: string;

  @IsNumber()
  @IsNotEmpty()
  @Expose()
  readonly ra: number;

  @IsNotEmpty()
  @Expose()
  readonly cpf: string;

  @IsEmail()
  @Expose()
  readonly email: string;

  @Expose()
  readonly created_at: Date;

  @Expose()
  readonly updated_at: Date;

  @Exclude()
  readonly deleted_at?: Date;

  constructor(partial: Partial<StudentResponseDto>) {
    Object.assign(this, partial);
  }
}
