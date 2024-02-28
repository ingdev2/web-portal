import { PartialType } from '@nestjs/swagger';
import { CreatePatientClassStatusDto } from './create-patient_class_status.dto';

export class UpdatePatientClassStatusDto extends PartialType(CreatePatientClassStatusDto) {}
