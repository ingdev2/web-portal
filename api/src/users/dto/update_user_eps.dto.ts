import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateUserEpsDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  last_name: string;

  @IsOptional()
  @IsNumber()
  id_number: number;

  @IsOptional()
  company_area: number;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  password: string;
}
