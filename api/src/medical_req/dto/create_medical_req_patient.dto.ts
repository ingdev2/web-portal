import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsBoolean,
  IsDateString,
  IsUUID,
  IsEmail,
  IsArray,
} from 'class-validator';

export class CreateMedicalReqPatientDto {
  @IsOptional()
  @IsString()
  filing_number: string;

  @IsNotEmpty()
  @IsNumber()
  requirement_type: number;

  @IsOptional()
  @IsUUID()
  aplicantId: string;

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
  @IsString()
  patient_name: string;

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
  @IsNumber()
  currently_in_area: number;

  @IsOptional()
  @IsNumber()
  medicalReqUserType: number;

  @IsNotEmpty()
  @IsString()
  user_message: string;

  @IsOptional()
  @IsArray()
  user_message_documents: string[];
}
