import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

export class StudentRegisterDto {
  @Expose()
  readonly student_id: number;

  @IsString({ message: 'O valor do campo Nome é inválido' })
  @IsNotEmpty({ message: 'O campo Nome é obrigatório' })
  @Expose()
  name: string;

  @IsString({ message: 'O valor do campo Registro Acadêmico é inválido' })
  @IsNotEmpty({ message: 'O campo Registro Acadêmico é obrigatório' })
  @Expose()
  ra: string;

  @IsNotEmpty({ message: 'O campo CPF é obrigatório' })
  @Expose()
  cpf: string;

  @IsEmail(undefined, { message: 'O campo E-mail deve ser um email válido' })
  @Expose()
  email: string;

  constructor(partial: Partial<StudentRegisterDto>) {
    Object.assign(this, partial);
  }
}
