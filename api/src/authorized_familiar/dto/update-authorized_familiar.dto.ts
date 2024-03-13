import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class UpdateAuthorizedFamiliarDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  name: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  last_name: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsNumber()
  cellphone: number;
}
