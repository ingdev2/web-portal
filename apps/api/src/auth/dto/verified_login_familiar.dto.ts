import { IsNotEmpty, IsString } from 'class-validator';

export class VerifiedLoginFamiliarDto {
  @IsNotEmpty()
  patient_id_number: number;

  @IsNotEmpty()
  @IsString()
  familiar_email: string;

  @IsNotEmpty()
  verification_code: number;
}
