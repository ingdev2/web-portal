import {
  IsNotEmpty,
  IsEmail,
  IsNumber,
  IsString,
  MinLength,
  IsOptional,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateUserEpsDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  last_name: string;

  @IsNotEmpty()
  @IsNumber()
  id_number: number;

  @IsNotEmpty()
  @MinLength(7)
  company_name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  @IsString()
  @MinLength(7)
  password: string;

  @IsOptional()
  user_role: number;

  @IsNotEmpty()
  user_gender: number;

  @IsNotEmpty()
  user_id_type: number;

  @IsNotEmpty()
  company_area: number;
}
