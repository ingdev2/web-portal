import {
  IsNotEmpty,
  IsEmail,
  IsEnum,
  IsNumber,
  IsString,
} from 'class-validator';
import { UserGender, UserIdType, UserRolType } from '../entities/user.entity';

export class CreateUserEpsDto {
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
  @IsEnum(UserIdType)
  id_type: UserIdType;

  @IsNotEmpty()
  @IsNumber()
  id_number: number;

  @IsNotEmpty()
  company_name: string;

  @IsNotEmpty()
  company_area: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsEnum(UserRolType)
  rol: UserRolType;
}
