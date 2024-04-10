import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Expose } from 'class-transformer';
import { IsUnique } from '@backend/validators/isUnique';

export class StudentRegisterDto {
  @Expose()
  readonly student_id: number;

  @IsString({ message: 'O valor do campo Nome é inválido' })
  @IsNotEmpty({ message: 'O campo Nome é obrigatório' })
  @Expose()
  name: string;

  @IsString({ message: 'O valor do campo Registro Acadêmico é inválido' })
  @IsNotEmpty({ message: 'O campo Registro Acadêmico é obrigatório' })
  @IsUnique(
    {
      tableName: 'student',
      column: 'ra',
    },
    { message: 'O RA informado já está em uso.' },
  )
  @Expose()
  ra: string;

  @IsNotEmpty({ message: 'O campo CPF é obrigatório' })
  @IsUnique(
    {
      tableName: 'student',
      column: 'cpf',
    },
    { message: 'O CPF informado já está em uso.' },
  )
  @Expose()
  cpf: string;

  @IsEmail(undefined, { message: 'O campo E-mail deve ser um email válido' })
  @IsUnique(
    {
      tableName: 'student',
      column: 'email',
    },
    { message: 'O E-mail informado já está em uso.' },
  )
  @Expose()
  email: string;

  constructor(partial: Partial<StudentRegisterDto>) {
    Object.assign(this, partial);
  }
}
