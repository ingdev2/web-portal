import { IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';

import { Transform } from 'class-transformer';

export class LoginDto {
  @IsNotEmpty()
  @IsNumber()
  id_number: number;

  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  @IsString()
  @MinLength(7)
  password: string;
}
