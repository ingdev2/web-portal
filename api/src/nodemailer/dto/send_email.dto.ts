import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class SendEmailDto {
  @IsOptional()
  @IsEmail()
  from?: string;

  @IsNotEmpty()
  recipients: string[];

  @IsOptional()
  @IsString()
  subject?: string;

  @IsNotEmpty()
  @IsString()
  userName: string;

  @IsNotEmpty()
  @IsString()
  pacientName: string;

  @IsNotEmpty()
  @IsNumber()
  pacientIdNumber: number;

  @IsOptional()
  @IsString()
  medicalReqFilingNumber: string;

  @IsOptional()
  @IsString()
  requirementType: string;

  @IsNotEmpty()
  @IsString()
  emailTemplate: string;

  @IsOptional()
  @IsString()
  requestStatusReq?: string;

  @IsOptional()
  @IsNumber()
  verificationCode: number;
}
