import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsBoolean,
  IsDateString,
  IsUUID,
  IsEmail,
  IsArray,
} from 'class-validator';

export class CreateMedicalReqEpsDto {
  @IsOptional()
  @IsString()
  filing_number: string;

  @IsNotEmpty()
  requirement_type: number;

  @IsNotEmpty()
  @IsString()
  registration_dates: string;

  @IsNotEmpty()
  @IsBoolean()
  right_petition: boolean;

  @IsOptional()
  @IsArray()
  copy_right_petition: string[];

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
  aplicant_eps_company: number;

  @IsOptional()
  aplicant_company_area: number;

  @IsOptional()
  @IsString()
  patient_name: string;

  @IsNotEmpty()
  patient_id_type: number;

  @IsNotEmpty()
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
  @IsString()
  response_time: string;

  @IsOptional()
  @IsDateString()
  download_expiration_date: Date;

  @IsOptional()
  requirement_status: number;

  @IsOptional()
  currently_in_area: number;

  @IsOptional()
  medicalReqUserType: number;

  @IsNotEmpty()
  @IsString()
  user_message: string;

  @IsOptional()
  @IsArray()
  user_message_documents: string[];
}
