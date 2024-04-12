import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Expose, Transform, TransformFnParams } from 'class-transformer'
import { IsUnique } from '@backend/validators/isUnique';

export class StudentEditDto {
  @Expose()
  readonly student_id: number;

  @IsString({ message: 'O valor do campo Nome é inválido' })
  @IsNotEmpty({ message: 'O campo Nome é obrigatório' })
  @Transform(({ value }: TransformFnParams) => value?.trim())
  name: string;

  @IsEmail(undefined, { message: 'O campo E-mail deve ser um email válido' })
  @IsUnique(
    {
      tableName: 'student',
      column: 'email',
      bypassIfEqual: 'student_id',
    },
    { message: 'O E-mail informado já está em uso.' },
  )
  @Transform(({ value }: TransformFnParams) => value?.trim())
  email: string;

  constructor(partial: Partial<StudentEditDto>) {
    Object.assign(this, partial);
  }
}
