import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ValidatePatientDto {
  @IsNotEmpty()
  @IsString()
  idType: string;

  @IsNotEmpty()
  @IsNumber()
  idNumber: number;
}
