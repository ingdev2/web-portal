import {
  IsNotEmpty,
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  IsOptional,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateUserEpsDto {
  @IsNotEmpty({ message: '¡Por favor ingresa un nombre!' })
  @IsString()
  @MinLength(3)
  name: string;

  @IsNotEmpty({ message: '¡Por favor ingresa un apellido!' })
  @IsString()
  @MinLength(3)
  last_name: string;

  @IsNotEmpty()
  user_id_type: number;

  @IsNotEmpty({ message: '¡Por favor ingresa un número de identificación!' })
  id_number: number;

  @IsNotEmpty({ message: '¡Por favor ingresa un correo electrónico!' })
  @IsEmail()
  email: string;

  @IsOptional({ message: '¡Por favor ingresa un número de celular!' })
  cellphone: number;

  @Transform(({ value }) => value.trim())
  @IsNotEmpty({ message: '¡Por favor ingresa una contraseña!' })
  @IsString()
  @MinLength(8)
  @MaxLength(31)
  password: string;

  @IsOptional()
  user_role: number;

  @IsNotEmpty({ message: '¡Por favor selecciona el sexo del colaborador!' })
  user_gender: number;

  @IsNotEmpty({
    message: '¡Por favor selecciona la EPS a la que pertenece el colaborador!',
  })
  eps_company: number;

  @IsNotEmpty({
    message:
      '¡Por favor selecciona el área de la empresa a la que pertenece el colaborador!',
  })
  company_area: number;

  @IsOptional({
    message: '¡Por favor selecciona el método de autenticación!',
  })
  authentication_method: number;

  @IsOptional()
  verification_code: number;
}
