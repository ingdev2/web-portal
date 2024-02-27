import {
  IsNotEmpty,
  IsEmail,
  IsEnum,
  IsNumber,
  IsString,
} from 'class-validator';
import { IdType } from '../../common/enums/id_type.enum';
import { AdminCompanyArea } from '../../common/enums/admin_company_area.enum';

export class CreateSuperAdminDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  last_name: string;

  @IsNotEmpty()
  @IsEnum(IdType)
  id_type: IdType;

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

  @IsNotEmpty()
  admin_role: number;

  @IsNotEmpty()
  admin_gender: number;
}
