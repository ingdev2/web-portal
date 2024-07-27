import {
  IsNotEmpty,
  IsEmail,
  IsString,
  MinLength,
  IsOptional,
  IsArray,
} from 'class-validator';

export class CreateAuthorizedFamiliarDto {
  @IsNotEmpty({ message: '¡Por favor ingresa un nombre!' })
  @IsString()
  @MinLength(3)
  name: string;

  @IsNotEmpty({ message: '¡Por favor ingresa un apellido!' })
  @IsString()
  @MinLength(3)
  last_name: string;

  @IsNotEmpty({ message: '¡Por favor ingresa un número de identificación!' })
  id_number: number;

  @IsOptional()
  @IsArray()
  copy_familiar_identification_document: string[];

  @IsNotEmpty({ message: '¡Por favor ingresa un correo electrónico!' })
  @IsEmail()
  email: string;

  @IsOptional({ message: '¡Por favor ingresa un número de celular!' })
  cellphone: number;

  @IsOptional()
  whatsapp: number;

  @IsNotEmpty({
    message: '¡Por favor selecciona el parentesco con el paciente!',
  })
  rel_with_patient: number;

  @IsOptional()
  user_role: number;

  @IsNotEmpty({
    message: '¡Por favor selecciona el sexo del familiar!',
  })
  user_gender: number;

  @IsNotEmpty({
    message: '¡Por favor selecciona el tipo de identificación!',
  })
  user_id_type: number;

  @IsNotEmpty({
    message: '¡Por favor selecciona el método de autenticación!',
  })
  authentication_method: number;

  @IsOptional()
  verification_code: number;
}
