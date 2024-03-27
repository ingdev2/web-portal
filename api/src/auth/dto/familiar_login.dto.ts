import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

export class FamiliarLoginDto {
  @IsNotEmpty()
  id_type: number;

  @IsNotEmpty()
  id_number: number;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  patient_id_number: number;

  @IsNotEmpty()
  @IsNumber()
  rel_with_patient: number;
}
