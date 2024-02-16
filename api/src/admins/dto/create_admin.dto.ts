import {
  IsNotEmpty,
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import {
  AdminGender,
  AdminIdType,
  AdminCompanyArea,
  AdminRolType,
} from '../entities/admin.entity';

export class CreateAdminDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  last_name: string;

  @IsNotEmpty()
  @IsEnum(AdminGender)
  gender: AdminGender;

  @IsNotEmpty()
  @IsEnum(AdminIdType)
  id_type: AdminIdType;

  @IsNotEmpty()
  @IsNumber()
  id_number: number;

  @IsNotEmpty()
  @IsEmail()
  corporate_email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  company_area: AdminCompanyArea;

  @IsOptional()
  @IsEnum(AdminRolType)
  rol: AdminRolType;
}
