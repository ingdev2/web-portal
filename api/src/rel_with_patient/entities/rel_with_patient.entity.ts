import { AuthorizedFamiliar } from '../../authorized_familiar/entities/authorized_familiar.entity';
import { RelationshipWithPatient } from '../../medical_req/enums/relationship_with_patient.enum';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RelWithPatient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ enum: RelationshipWithPatient })
  name: RelationshipWithPatient;

  @OneToMany(
    () => AuthorizedFamiliar,
    (authorized_familiar) => authorized_familiar.relationship_with_patient,
  )
  familiar: AuthorizedFamiliar[];
}
