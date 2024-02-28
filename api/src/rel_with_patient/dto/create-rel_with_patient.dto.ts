import { IsEnum, IsNotEmpty } from 'class-validator';
import { RelationshipWithPatient } from '../../medical_req/enums/relationship_with_patient.enum';

export class CreateRelWithPatientDto {
  @IsNotEmpty()
  @IsEnum(RelationshipWithPatient)
  name: RelationshipWithPatient;
}
