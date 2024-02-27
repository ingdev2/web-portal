import {
  IsNotEmpty,
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsDateString,
  MinLength,
} from 'class-validator';
import { Gender } from '../../common/enums/gender.enum';
import { IdType } from '../../common/enums/id_type.enum';
import { Transform } from 'class-transformer';

export class CreateUserPersonDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  last_name: string;

  @IsNotEmpty()
  @IsEnum(Gender)
  gender: Gender;

  @IsNotEmpty()
  @IsDateString()
  birthay_date: Date;

  @IsNotEmpty()
  @IsEnum(IdType)
  id_type: IdType;

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

  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  @IsString()
  @MinLength(7)
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

  @IsNotEmpty()
  user_role: number;
}
