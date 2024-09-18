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

  @IsOptional()
  @IsString()
  familiarNameToEmail: string;

  @IsOptional()
  @IsString()
  patientNameToEmail: string;

  @IsOptional()
  @IsNumber()
  patientIdNumberToEmail: number;

  @IsOptional()
  @IsString()
  emailOfEps: string;

  @IsOptional()
  @IsString()
  emailOfFamiliar: string;

  @IsOptional()
  @IsString()
  relationshipWithPatient: string;

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
  @IsString()
  personalDataProcessingPolicy: string;

  @IsOptional()
  @IsNumber()
  verificationCode: number;

  @IsOptional()
  @IsString()
  resetPasswordUrl: string;

  @IsOptional()
  @IsString()
  contactPbx: string;
}
