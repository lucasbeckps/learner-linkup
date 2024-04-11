import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { IsUnique } from '@backend/validators/isUnique';

export class UserRegisterDto {
  @IsString({ message: 'O valor do campo Nome é inválido' })
  @IsNotEmpty({ message: 'O campo Nome é obrigatório' })
  name: string;

  @IsEmail(undefined, { message: 'O campo E-mail deve ser um email válido' })
  @IsUnique(
    {
      tableName: 'user',
      column: 'email',
    },
    { message: 'O E-mail informado já está em uso.' },
  )
  email: string;

  @IsString({ message: 'O valor do campo Senha é inválido' })
  @IsNotEmpty({ message: 'O campo Senha é obrigatório' })
  @IsStrongPassword()
  password: string;
}
