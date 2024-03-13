import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsBoolean,
  IsDateString,
  IsUUID,
  IsArray,
  IsEmail,
} from 'class-validator';

export class CreateMedicalReqFamiliarDto {
  @IsNotEmpty()
  requirement_type: number;

  @IsNotEmpty()
  @IsBoolean()
  right_petition: boolean;

  @IsOptional()
  @IsArray()
  copy_right_petition: string[];

  @IsOptional()
  @IsString()
  aplicant_name: string;

  @IsOptional()
  @IsString()
  aplicant_last_name: string;

  @IsOptional()
  aplicant_gender: number;

  @IsOptional()
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

  @IsNotEmpty()
  relationship_with_patient: number;

  @IsNotEmpty()
  patient_id_type: number;

  @IsNotEmpty()
  @IsNumber()
  patient_id_number: number;

  @IsNotEmpty()
  patient_class_status: number;

  @IsOptional()
  @IsBoolean()
  accept_terms: boolean;

  @IsOptional()
  @IsArray()
  copy_applicant_citizenship_card: string[];

  @IsOptional()
  @IsArray()
  copy_patient_citizenship_card: string[];

  @IsOptional()
  @IsArray()
  copy_patient_civil_registration: string[];

  @IsOptional()
  @IsArray()
  copy_parents_citizenship_card: string[];

  @IsOptional()
  @IsArray()
  copy_marriage_certificate: string[];

  @IsOptional()
  @IsArray()
  copy_cohabitation_certificate: string[];

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
  requirement_status: number;

  @IsOptional()
  @IsBoolean()
  is_deleted: boolean;

  @IsOptional()
  @IsUUID()
  aplicantId: string;

  @IsOptional()
  medicalReqUserType: number;
}
