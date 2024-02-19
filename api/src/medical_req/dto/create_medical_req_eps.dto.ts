import {
  IsNotEmpty,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsBoolean,
  IsDateString,
  IsUUID,
} from 'class-validator';
import {
  RequirementType,
  RelationshipWithPatient,
  RequestStatus,
} from '../entities/medical_req.entity';
import { UserGender, UserIdType } from 'src/users/entities/user.entity';

export class CreateMedicalReqEpsDto {
  @IsNotEmpty()
  @IsEnum(RequirementType)
  requirement_type: RequirementType;

  @IsOptional()
  @IsString()
  aplicant_name: string;

  @IsOptional()
  @IsString()
  aplicant_last_name: string;

  @IsOptional()
  @IsEnum(UserGender)
  aplicant_gender: UserGender;

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
  @IsString()
  aplicant_company_name: string;

  @IsOptional()
  @IsString()
  aplicant_company_area: string;

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
}
