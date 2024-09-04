import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class ResetPasswordAdminDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(31)
  newPassword: string;
}
