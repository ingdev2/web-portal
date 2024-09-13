import { IsNotEmpty } from 'class-validator';

export class ForgotPasswordUserEpsDto {
  @IsNotEmpty({ message: '¡Datos ingresados incorrectos!' })
  id_type: number;

  @IsNotEmpty({ message: '¡Datos ingresados incorrectos!' })
  id_number: number;

  @IsNotEmpty({ message: '¡Datos ingresados incorrectos!' })
  eps_company: number;
}
