import {
  IsNotEmpty,
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsDate,
  IsEmpty,
  IsString,
} from 'class-validator';
import { UserGender, UserIdType, UserRolType } from '../entities/user.entity';

export class UpdateUserPersonDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  last_name: string;

  @IsOptional()
  @IsEnum(UserGender)
  gender: UserGender;

  @IsOptional()
  @IsDate()
  birthay_date: Date;

  @IsEmpty()
  company_name: string;

  @IsEmpty()
  @IsEnum(UserIdType)
  id_type: UserIdType;

  @IsEmpty()
  @IsNumber()
  id_number: number;

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

  @IsEmpty()
  company_area: string;

  @IsEmpty()
  @IsEnum(UserRolType)
  rol: UserRolType;

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
