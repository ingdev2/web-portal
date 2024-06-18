import { IsNotEmpty, IsEmail } from 'class-validator';

export class ForgotPasswordAdminDto {
  @IsNotEmpty()
  @IsEmail()
  corporate_email: string;
}
