import { IsNotEmpty, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class LoginDto {
  @IsNotEmpty({ message: '¡Datos ingresados incorrectos!' })
  id_type: number;

  @IsNotEmpty({ message: '¡Datos ingresados incorrectos!' })
  id_number: number;

  @Transform(({ value }) => value.trim())
  @IsNotEmpty({ message: '¡Datos ingresados incorrectos!' })
  @IsString()
  password: string;
}
