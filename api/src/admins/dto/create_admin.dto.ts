import { IsNotEmpty, IsEmail, IsNumber, IsString } from 'class-validator';
import { AdminCompanyArea } from '../../common/enums/admin_company_area.enum';

export class CreateAdminDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  last_name: string;

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

  @IsNotEmpty()
  admin_id_type: number;
}
