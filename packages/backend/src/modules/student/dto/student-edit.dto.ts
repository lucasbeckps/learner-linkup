import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

export class StudentEditDto {
  @Expose()
  readonly student_id: number;

  @IsString({ message: 'O valor do campo Nome é inválido' })
  @IsNotEmpty({ message: 'O campo Nome é obrigatório' })
  @Expose()
  name: string;

  @IsString({ message: 'O valor do campo Registro Acadêmico é inválido' })
  @IsNotEmpty({ message: 'O campo Registro Acadêmico é obrigatório' })
  @Expose()
  readonly ra: string;

  @IsNotEmpty({ message: 'O campo CPF é obrigatório' })
  @Expose()
  readonly cpf: string;

  @IsEmail(undefined, { message: 'O campo E-mail deve ser um email válido' })
  @Expose()
  email: string;

  constructor(partial: Partial<StudentEditDto>) {
    Object.assign(this, partial);
  }
}
