import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

export class FamiliarLoginDto {
  @IsNotEmpty({ message: '¡Datos ingresados incorrectos!' })
  id_type_familiar: number;

  @IsNotEmpty({ message: '¡Datos ingresados incorrectos!' })
  id_number_familiar: number;

  @IsNotEmpty({ message: '¡Datos ingresados incorrectos!' })
  @IsEmail()
  email_familiar: string;

  @IsNotEmpty({ message: '¡Datos ingresados incorrectos!' })
  @IsNumber()
  patient_id_number: number;

  @IsNotEmpty({ message: '¡Datos ingresados incorrectos!' })
  @IsNumber()
  rel_with_patient: number;
}
