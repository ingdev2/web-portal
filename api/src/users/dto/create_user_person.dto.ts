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
import { UserGender, UserIdType, UserRolType } from '../user.entity';

export class CreateUserPersonDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  last_name: string;

  @IsNotEmpty()
  @IsEnum(UserGender)
  gender: UserGender;

  @IsNotEmpty()
  @IsDate()
  birthay_date: Date;

  @IsEmpty()
  company_name: string;

  @IsNotEmpty()
  @IsEnum(UserIdType)
  id_type: UserIdType;

  @IsNotEmpty()
  @IsNumber()
  id_number: number;

  @IsNotEmpty()
  @IsDate()
  id_exp_date: Date;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsNumber()
  cellphone: number;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsEmpty()
  company_area: string;

  @IsOptional()
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
