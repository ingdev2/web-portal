import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsBoolean,
  IsDateString,
  IsUUID,
  IsArray,
  IsEmail,
} from 'class-validator';

export class CreateMedicalReqFamiliarDto {
  @IsOptional()
  @IsString()
  filing_number: string;

  @IsNotEmpty()
  requirement_type: number;

  @IsNotEmpty()
  @IsString()
  registration_dates: string;

  @IsNotEmpty()
  patient_class_status: number;

  @IsNotEmpty()
  relationship_with_patient: number;

  @IsNotEmpty()
  patient_id_type: number;

  @IsNotEmpty()
  patient_id_number: number;

  @IsOptional()
  @IsString()
  patient_name: string;

  @IsNotEmpty()
  @IsBoolean()
  right_petition: boolean;

  @IsOptional()
  @IsArray()
  copy_right_petition: string[];

  @IsNotEmpty()
  @IsString()
  user_message: string;

  @IsOptional()
  @IsArray()
  user_message_documents: string[];

  @IsOptional()
  medicalReqUserType: number;

  @IsOptional()
  @IsUUID()
  familiar_id: string;

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
  aplicant_id_number: number;

  @IsOptional()
  @IsEmail()
  aplicant_email: string;

  @IsOptional()
  aplicant_cellphone: number;

  @IsOptional()
  @IsBoolean()
  accept_terms: boolean;

  @IsOptional()
  @IsArray()
  copy_applicant_identification_document: string[];

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
  currently_in_area: number;
}
