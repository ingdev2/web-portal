import { IsEmail, IsNumber, IsString, IsOptional } from 'class-validator';

export class UpdateAdminDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  last_name: string;

  @IsOptional()
  id_number: number;

  @IsOptional()
  @IsEmail()
  corporate_email: string;

  @IsOptional()
  company_area: number;

  @IsOptional()
  position_level: number;
}
