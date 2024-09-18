import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

export class FamiliarResendCodeDto {
  @IsNotEmpty({ message: '¡Datos ingresados incorrectos!' })
  id_type_familiar: number;

  @IsNotEmpty({ message: '¡Datos ingresados incorrectos!' })
  id_number_familiar: number;

  @IsNotEmpty({ message: '¡Datos ingresados incorrectos!' })
  @IsEmail()
  email_familiar: string;
}
