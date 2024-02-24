import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

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
  medicalReqFilingNumber: string;

  @IsNotEmpty()
  @IsString()
  requirementType: string;

  @IsNotEmpty()
  @IsString()
  emailTemplate: string;

  @IsOptional()
  @IsString()
  requestStatusReq?: string;
}
