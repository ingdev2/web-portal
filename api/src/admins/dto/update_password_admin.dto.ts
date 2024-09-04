import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';

export class UpdatePasswordAdminDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(31)
  oldPassword: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(31)
  newPassword: string;
}
