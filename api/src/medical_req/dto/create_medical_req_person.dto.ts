import {
  IsNotEmpty,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsBoolean,
  IsDateString,
  IsUUID,
  IsArray,
  IsEmail,
} from 'class-validator';
import {
  RequirementType,
  RelationshipWithPatient,
  RequestStatus,
  PatientClassificationStatus,
} from '../entities/medical_req.entity';
import { Gender } from '../../common/enums/gender.enum';
import { IdType } from '../../common/enums/id_type.enum';

export class CreateMedicalReqPersonDto {
  @IsNotEmpty()
  @IsEnum(RequirementType)
  requirement_type: RequirementType;

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
  @IsEnum(IdType)
  aplicant_id_type: IdType;

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
  @IsEnum(RelationshipWithPatient)
  relationship_with_patient: RelationshipWithPatient;

  @IsNotEmpty()
  @IsEnum(IdType)
  patient_id_type: IdType;

  @IsNotEmpty()
  @IsNumber()
  patient_id_number: number;

  @IsNotEmpty()
  @IsEnum(PatientClassificationStatus)
  patient_class_status: PatientClassificationStatus;

  @IsOptional()
  @IsDateString()
  patient_id_exp_date: Date;

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
  @IsEnum(RequestStatus)
  request_status: RequestStatus;

  @IsOptional()
  @IsBoolean()
  is_deleted: boolean;

  @IsOptional()
  @IsUUID()
  aplicantId: string;

  @IsOptional()
  medicalReqUserType: number;
}
