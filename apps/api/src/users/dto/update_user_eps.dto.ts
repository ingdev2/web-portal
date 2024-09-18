import { IsEmail, IsOptional } from 'class-validator';

export class UpdateUserEpsDto {
  // @IsOptional()
  // @IsString()
  // name: string;

  // @IsOptional()
  // @IsString()
  // last_name: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  cellphone: number;

  @IsOptional()
  authentication_method: number;

  @IsOptional()
  company_area: number;
}
