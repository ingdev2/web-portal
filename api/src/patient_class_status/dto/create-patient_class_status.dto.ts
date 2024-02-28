import { IsEnum, IsNotEmpty } from 'class-validator';
import { PatientClassificationStatus } from 'src/medical_req/enums/patient_classification_status.enum';

export class CreatePatientClassStatusDto {
  @IsNotEmpty()
  @IsEnum(PatientClassificationStatus)
  name: PatientClassificationStatus;
}
