import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class CreateEpsCompanyDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(7)
  @MaxLength(13)
  nit: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(7)
  main_email: string;
}
