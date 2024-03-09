import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';

export class UpdatePasswordAdminDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(7)
  @MaxLength(14)
  oldPassword: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(7)
  @MaxLength(14)
  newPassword: string;
}
