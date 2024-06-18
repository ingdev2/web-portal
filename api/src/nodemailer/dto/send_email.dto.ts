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
  userNameToEmail: string;

  @IsNotEmpty()
  @IsString()
  patientNameToEmail: string;

  @IsNotEmpty()
  @IsNumber()
  patientIdNumberToEmail: number;

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
  @IsString()
  portalWebUrl: string;

  @IsOptional()
  @IsNumber()
  verificationCode: number;

  @IsOptional()
  @IsString()
  resetPasswordUrl: string;
}
