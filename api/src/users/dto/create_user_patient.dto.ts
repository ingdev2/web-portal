import {
  IsNotEmpty,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  IsDateString,
  MinLength,
  MaxLength,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateUserPatientDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  name: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  last_name: string;

  @IsOptional()
  @IsDateString()
  birthdate: Date;

  @IsNotEmpty()
  @IsNumber()
  id_number: number;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsNumber()
  cellphone: number;

  @IsOptional()
  @IsNumber()
  whatsapp: number;

  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  @IsString()
  @MinLength(7)
  @MaxLength(14)
  password: string;

  @IsOptional()
  @IsString()
  affiliation_eps: string;

  @IsOptional()
  @IsString()
  residence_department: string;

  @IsOptional()
  @IsString()
  residence_city: string;

  @IsOptional()
  @IsString()
  residence_address: string;

  @IsOptional()
  @IsString()
  residence_neighborhood: string;

  @IsOptional()
  user_role: number;

  @IsOptional()
  user_gender: number;

  @IsNotEmpty()
  user_id_type: number;

  @IsNotEmpty()
  @IsNumber()
  authentication_method: number;

  @IsOptional()
  @IsNumber()
  verification_code: number;
}
