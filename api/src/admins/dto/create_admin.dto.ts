import {
  IsNotEmpty,
  IsEmail,
  IsNumber,
  IsString,
  IsOptional,
  MinLength,
  MaxLength,
} from 'class-validator';

export class CreateAdminDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  last_name: string;

  @IsNotEmpty()
  id_number: number;

  @IsNotEmpty()
  @IsEmail()
  corporate_email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(7)
  @MaxLength(14)
  password: string;

  @IsOptional()
  admin_role: number;

  @IsNotEmpty()
  admin_gender: number;

  @IsNotEmpty()
  admin_id_type: number;

  @IsNotEmpty()
  company_area: number;

  @IsNotEmpty()
  position_level: number;
}
