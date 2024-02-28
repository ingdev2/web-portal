import { IsNotEmpty, IsEnum, IsOptional, IsDateString } from 'class-validator';
import { RequirementStatus } from '../entities/medical_req.entity';

export class UpdateStatusMedicalReqDto {
  @IsNotEmpty()
  @IsEnum(RequirementStatus)
  request_status: RequirementStatus;

  @IsOptional()
  @IsDateString()
  answer_date: Date;

  @IsOptional()
  @IsDateString()
  download_expiration_date: Date;
}
