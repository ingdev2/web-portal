import {
  IsNotEmpty,
  IsEmail,
  IsNumber,
  IsString,
  IsOptional,
} from 'class-validator';

export class CreateSuperAdminDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  last_name: string;

  @IsNotEmpty()
  @IsNumber()
  id_number: number;

  @IsNotEmpty()
  @IsEmail()
  corporate_email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsOptional()
  admin_role: number;

  @IsNotEmpty()
  admin_gender: number;

  @IsNotEmpty()
  admin_id_type: number;

  @IsNotEmpty()
  company_area: number;
}
