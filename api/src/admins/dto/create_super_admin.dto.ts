import {
  IsNotEmpty,
  IsEmail,
  IsString,
  IsOptional,
  MinLength,
  MaxLength,
} from 'class-validator';

export class CreateSuperAdminDto {
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
  @MinLength(8)
  @MaxLength(31)
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
