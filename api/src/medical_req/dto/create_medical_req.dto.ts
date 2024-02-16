import {
  IsNotEmpty,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsBoolean,
  IsDateString,
} from 'class-validator';
import {
  RequirementType,
  RelationshipWithPatient,
  RequestStatus,
} from '../entities/medical_req.entity';
import { UserIdType } from 'src/users/entities/user.entity';

export class CreateMedicalReqDto {
  @IsNotEmpty()
  @IsEnum(RequirementType)
  requirement_type: RequirementType;

  @IsNotEmpty()
  @IsBoolean()
  right_petition: boolean;

  @IsOptional()
  @IsString()
  copy_right_petition: string;

  @IsOptional()
  @IsString()
  aplicant_name: string;

  @IsOptional()
  @IsString()
  aplicant_last_name: string;

  @IsOptional()
  @IsEnum(UserIdType)
  aplicant_id_type: UserIdType;

  @IsOptional()
  @IsNumber()
  aplicant_id_number: number;

  @IsOptional()
  @IsString()
  aplicant_email: string;

  @IsOptional()
  @IsNumber()
  aplicant_cellphone: number;

  @IsNotEmpty()
  @IsEnum(RelationshipWithPatient)
  relationship_with_patient: RelationshipWithPatient;

  @IsNotEmpty()
  @IsEnum(UserIdType)
  patient_id_type: UserIdType;

  @IsNotEmpty()
  @IsNumber()
  patient_id_number: number;

  @IsNotEmpty()
  @IsDateString()
  patient_id_exp_date: Date;

  @IsOptional()
  @IsString()
  copy_applicant_citizenship_card: string;

  @IsOptional()
  @IsString()
  copy_patient_citizenship_card: string;

  @IsOptional()
  @IsString()
  copy_patient_civil_registration: string;

  @IsOptional()
  @IsString()
  copy_parents_citizenship_card: string;

  @IsOptional()
  @IsString()
  copy_marriage_certicate: string;

  @IsOptional()
  @IsString()
  copy_cohabitation_certificate: string;

  @IsNotEmpty()
  @IsDateString()
  date_of_admission: Date;

  @IsOptional()
  @IsDateString()
  answer_date: Date;

  @IsOptional()
  @IsDateString()
  download_expiration_date: Date;

  @IsOptional()
  @IsEnum(RequestStatus)
  request_status: RequestStatus;

  @IsOptional()
  @IsBoolean()
  is_deleted: boolean;
}
