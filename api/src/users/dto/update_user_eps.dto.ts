import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateUserEpsDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  last_name: string;

  @IsOptional()
  company_area: number;

  @IsOptional()
  @IsEmail()
  email: string;
}
