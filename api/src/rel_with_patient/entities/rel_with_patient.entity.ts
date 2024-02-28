import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RelationshipWithPatient } from 'src/medical_req/enums/relationship_with_patient.enum';
import { MedicalReq } from '../../medical_req/entities/medical_req.entity';

@Entity()
export class RelWithPatient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ enum: RelationshipWithPatient })
  name: RelationshipWithPatient;

  @OneToMany(() => MedicalReq, (medical_req) => medical_req.rel_with_patient)
  medical_req: MedicalReq[];
}
