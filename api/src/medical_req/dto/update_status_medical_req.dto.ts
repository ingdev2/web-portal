import { IsNotEmpty, IsEnum, IsOptional, IsDateString } from 'class-validator';

export class UpdateStatusMedicalReqDto {
  @IsNotEmpty()
  requirement_status: number;

  @IsOptional()
  @IsDateString()
  answer_date: Date;

  @IsOptional()
  @IsDateString()
  download_expiration_date: Date;
}
