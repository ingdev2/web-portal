import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsBoolean,
  IsDateString,
  IsUUID,
  IsEmail,
} from 'class-validator';

export class CreateMedicalReqPatientDto {
  @IsNotEmpty()
  @IsNumber()
  requirement_type: number;

  @IsOptional()
  @IsString()
  aplicant_name: string;

  @IsOptional()
  @IsString()
  aplicant_last_name: string;

  @IsOptional()
  @IsNumber()
  aplicant_gender: number;

  @IsOptional()
  @IsNumber()
  aplicant_id_type: number;

  @IsOptional()
  @IsNumber()
  aplicant_id_number: number;

  @IsOptional()
  @IsEmail()
  aplicant_email: string;

  @IsOptional()
  @IsNumber()
  aplicant_cellphone: number;

  @IsOptional()
  @IsNumber()
  patient_id_type: number;

  @IsOptional()
  @IsNumber()
  patient_id_number: number;

  @IsOptional()
  @IsBoolean()
  accept_terms: boolean;

  @IsOptional()
  @IsDateString()
  date_of_admission: Date;

  @IsOptional()
  @IsDateString()
  answer_date: Date;

  @IsOptional()
  @IsDateString()
  download_expiration_date: Date;

  @IsOptional()
  @IsNumber()
  requirement_status: number;

  @IsOptional()
  @IsBoolean()
  is_deleted: boolean;

  @IsOptional()
  @IsUUID()
  aplicantId: string;

  @IsOptional()
  @IsNumber()
  medicalReqUserType: number;
}
