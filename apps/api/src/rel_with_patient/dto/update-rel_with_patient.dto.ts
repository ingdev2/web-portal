import { PartialType } from '@nestjs/swagger';
import { CreateRelWithPatientDto } from './create-rel_with_patient.dto';

export class UpdateRelWithPatientDto extends PartialType(CreateRelWithPatientDto) {}
