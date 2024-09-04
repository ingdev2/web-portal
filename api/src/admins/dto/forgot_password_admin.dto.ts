import { IsNotEmpty, IsNumber, IsEmail } from 'class-validator';

export class ForgotPasswordAdminDto {
  @IsNotEmpty()
  @IsNumber()
  admin_id_type: number;

  @IsNotEmpty()
  @IsNumber()
  id_number: number;

  @IsNotEmpty()
  @IsEmail()
  corporate_email: string;
}
