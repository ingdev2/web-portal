import {
  IsOptional,
  IsDateString,
  IsNumber,
  IsString,
  IsArray,
} from 'class-validator';

export class UpdateStatusMedicalReqDto {
  @IsOptional()
  @IsNumber()
  requirement_status: number;

  @IsOptional()
  @IsString()
  response_comments: string;

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  motive_for_rejection: number[];

  @IsOptional()
  @IsArray()
  documents_delivered: string[];

  @IsOptional()
  @IsDateString()
  answer_date: Date;

  @IsOptional()
  @IsDateString()
  download_expiration_date: Date;

  @IsOptional()
  @IsNumber()
  currently_in_area: number;
}
