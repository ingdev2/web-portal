import {
  IsOptional,
  IsDateString,
  IsNumber,
  IsString,
  IsArray,
  IsBoolean,
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
  @IsString()
  response_time: string;

  @IsOptional()
  @IsDateString()
  download_expiration_date: Date;

  @IsOptional()
  @IsBoolean()
  is_it_reviewed: boolean;

  @IsOptional()
  @IsNumber()
  currently_in_area: number;

  @IsOptional()
  @IsString()
  area_redirection_message: string;
}
