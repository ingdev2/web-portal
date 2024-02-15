import {
  IsNotEmpty,
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsDate,
  IsString,
  IsDateString,
} from 'class-validator';
import { UserGender, UserIdType } from '../entities/user.entity';

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
  @IsDateString()
  birthay_date: Date;

  @IsNotEmpty()
  @IsEnum(UserIdType)
  id_type: UserIdType;

  @IsNotEmpty()
  @IsNumber()
  id_number: number;

  @IsNotEmpty()
  @IsDateString()
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
