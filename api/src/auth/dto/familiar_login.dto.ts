import { IsEmail, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class FamiliarLoginDto {
  @IsNotEmpty()
  id_type: number;

  @IsNotEmpty()
  id_number: number;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsNumber()
  patient_id_number: number;

  @IsOptional()
  @IsNumber()
  rel_with_patient: number;
}
