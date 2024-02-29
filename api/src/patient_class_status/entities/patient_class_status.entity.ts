import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PatientClassificationStatus } from '../../medical_req/enums/patient_classification_status.enum';
import { MedicalReq } from '../../medical_req/entities/medical_req.entity';

@Entity()
export class PatientClassStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ enum: PatientClassificationStatus })
  name: PatientClassificationStatus;

  @OneToMany(() => MedicalReq, (medical_req) => medical_req.patient_class)
  medical_req: MedicalReq[];
}
