import {
  IsNotEmpty,
  IsEmail,
  IsEnum,
  IsNumber,
  IsString,
  MinLength,
  MaxLength,
} from 'class-validator';
import { UserGender, UserIdType, UserRolType } from '../entities/user.entity';
import { Transform } from 'class-transformer';

export class CreateUserEpsDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  last_name: string;

  @IsNotEmpty()
  @IsEnum(UserGender)
  gender: UserGender;

  @IsNotEmpty()
  @IsEnum(UserIdType)
  id_type: UserIdType;

  @IsNotEmpty()
  @IsNumber()
  id_number: number;

  @IsNotEmpty()
  @MinLength(7)
  company_name: string;

  @IsNotEmpty()
  @MinLength(7)
  company_area: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  @IsString()
  @MinLength(7)
  password: string;

  @IsNotEmpty()
  @IsEnum(UserRolType)
  role: UserRolType;
}
