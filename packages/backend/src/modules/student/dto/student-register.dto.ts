import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator'
import { IsUnique } from '@backend/validators/isUnique';
import { Transform, TransformFnParams } from 'class-transformer'

export class StudentRegisterDto {
  @IsString({ message: 'O valor do campo Nome é inválido' })
  @IsNotEmpty({ message: 'O campo Nome é obrigatório' })
  @Transform(({ value }: TransformFnParams) => value?.trim())
  name: string;

  @IsNumber({}, { message: 'O valor do campo Registro Acadêmico é inválido' })
  @IsNotEmpty({ message: 'O campo Registro Acadêmico é obrigatório' })
  @IsUnique(
    {
      tableName: 'student',
      column: 'ra',
    },
    { message: 'O RA informado já está em uso.' },
  )
  ra: number;

  @IsNotEmpty({ message: 'O campo CPF é obrigatório' })
  @IsUnique(
    {
      tableName: 'student',
      column: 'cpf',
    },
    { message: 'O CPF informado já está em uso.' },
  )
  @Transform(({ value }: TransformFnParams) => value?.trim())
  cpf: string;

  @IsEmail(undefined, { message: 'O campo E-mail deve ser um email válido' })
  @IsUnique(
    {
      tableName: 'student',
      column: 'email',
    },
    { message: 'O E-mail informado já está em uso.' },
  )
  @Transform(({ value }: TransformFnParams) => value?.trim())
  email: string;

  constructor(partial: Partial<StudentRegisterDto>) {
    Object.assign(this, partial);
  }
}
