import {
  IsEmail,
  IsNumber,
  IsString,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { AdminRolType } from 'src/common/enums/admin_roles.enum';

export class UpdateAdminDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  last_name: string;

  @IsOptional()
  @IsNumber()
  id_number: number;

  @IsOptional()
  @IsEmail()
  corporate_email: string;

  @IsOptional()
  @IsString()
  password: string;
}
