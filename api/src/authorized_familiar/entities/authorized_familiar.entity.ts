import { User } from '../../users/entities/user.entity';
import { UserRole } from '../../user_roles/entities/user_role.entity';
import { GenderType } from '../../genders/entities/gender.entity';
import { IdTypeEntity } from '../../id_types/entities/id_type.entity';
import { MedicalReq } from '../../medical_req/entities/medical_req.entity';
import { RelWithPatient } from '../../rel_with_patient/entities/rel_with_patient.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class AuthorizedFamiliar {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text' })
  last_name: string;

  @ManyToOne(() => GenderType, (gender) => gender.user)
  @JoinColumn({ name: 'user_gender', referencedColumnName: 'id' })
  gender: GenderType;

  @Column()
  user_gender: number;

  @ManyToOne(() => IdTypeEntity, (id_type) => id_type.user)
  @JoinColumn({ name: 'user_id_type', referencedColumnName: 'id' })
  id_type: IdTypeEntity;

  @Column()
  user_id_type: number;

  @Column({ type: 'bigint' })
  id_number: number;

  @ManyToOne(() => UserRole, (role) => role.familiar, {
    eager: true,
    cascade: true,
  })
  @JoinColumn({ name: 'user_role', referencedColumnName: 'id' })
  role: UserRole;

  @Column()
  user_role: number;

  @Column({ unique: true })
  email: string;

  @Column({ type: 'bigint', nullable: true })
  cellphone: number;

  @Column({ type: 'bigint', nullable: true })
  whatsapp: number;

  @ManyToOne(
    () => RelWithPatient,
    (relationship_with_patient) => relationship_with_patient.familiar,
    {
      eager: true,
      cascade: true,
    },
  )
  @JoinColumn({ name: 'rel_with_patient', referencedColumnName: 'id' })
  relationship_with_patient: RelWithPatient;

  @Column()
  rel_with_patient: number;

  @OneToMany(() => MedicalReq, (medical_req) => medical_req.familiar)
  medical_req: MedicalReq[];

  @Column({ type: 'boolean', default: false })
  accept_terms: boolean;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @Column({ type: 'text', array: true, nullable: true })
  copy_familiar_citizenship_card: string[];

  @Column({ type: 'uuid' })
  patient_id: string;

  @Column({ nullable: true })
  verification_code: number;
}
