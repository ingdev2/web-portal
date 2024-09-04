import { IsNotEmpty, IsDateString, Matches } from 'class-validator';

export class ForgotPasswordUserPatientDto {
  @IsNotEmpty({ message: '¡Datos ingresados incorrectos!' })
  id_type: number;

  @IsNotEmpty({ message: '¡Datos ingresados incorrectos!' })
  id_number: number;

  @IsNotEmpty({ message: '¡Datos ingresados incorrectos!' })
  @IsDateString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'La fecha debe estar en el formato YYYY-MM-DD',
  })
  birthdate: Date;
}
