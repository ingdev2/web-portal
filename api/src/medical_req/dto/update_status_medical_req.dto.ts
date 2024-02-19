import { IsNotEmpty, IsEnum } from 'class-validator';
import { RequestStatus } from '../entities/medical_req.entity';

export class UpdateStatusMedicalReqDto {
  @IsNotEmpty()
  @IsEnum(RequestStatus)
  request_status: RequestStatus;
}
