import { IsNotEmpty, IsEnum, IsOptional, IsDateString } from 'class-validator';
import { RequestStatus } from '../entities/medical_req.entity';

export class UpdateStatusMedicalReqDto {
  @IsNotEmpty()
  @IsEnum(RequestStatus)
  request_status: RequestStatus;

  @IsOptional()
  @IsDateString()
  answer_date: Date;

  @IsOptional()
  @IsDateString()
  download_expiration_date: Date;
}
