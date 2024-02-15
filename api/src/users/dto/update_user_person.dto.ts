import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsDate,
  IsString,
} from 'class-validator';

export class UpdateUserPersonDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  last_name: string;

  @IsOptional()
  @IsDate()
  birthay_date: Date;

  @IsOptional()
  @IsDate()
  id_exp_date: Date;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsNumber()
  cellphone: number;

  @IsOptional()
  @IsString()
  password: string;

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
}
