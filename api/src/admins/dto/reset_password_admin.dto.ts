import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class ResetPasswordAdminDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(7)
  @MaxLength(14)
  new_password: string;
}
