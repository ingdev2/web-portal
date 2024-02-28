import { User } from '../../users/entities/user.entity';
import { RequirementType } from '../../requirement_type/entities/requirement_type.entity';
import { PatientClassStatus } from 'src/patient_class_status/entities/patient_class_status.entity';
import { RelWithPatient } from '../../rel_with_patient/entities/rel_with_patient.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum RequirementStatus {
  PENDING = 'Pendiente',
  DELIVERED = 'Entregada',
  REJECTED = 'Rechazada',
  EXPIRED = 'Expirada',
}

@Entity()
export class MedicalReq {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ generated: 'uuid' })
  filing_number: string;

  @Column({ type: 'boolean', default: false })
  right_petition: boolean;

  @Column({ type: 'text', array: true, nullable: true })
  copy_right_petition: string[];

  @Column({ type: 'text', nullable: true })
  aplicant_name: string;

  @Column({ type: 'text', nullable: true })
  aplicant_last_name: string;

  @Column({ nullable: true })
  aplicant_gender: number;

  @Column({ nullable: true })
  aplicant_id_type: number;

  @Column({ type: 'bigint', nullable: true })
  aplicant_id_number: number;

  @Column({ nullable: true })
  aplicant_email: string;

  @Column({ type: 'bigint', nullable: true })
  aplicant_cellphone: number;

  @Column({ nullable: true })
  aplicant_company_area: number;

  @Column()
  patient_id_type: number;

  @Column({ type: 'bigint' })
  patient_id_number: number;

  @Column({ type: 'date', nullable: true })
  patient_id_exp_date: Date;

  @Column({ type: 'text', array: true, nullable: true })
  copy_applicant_citizenship_card: string[];

  @Column({ type: 'text', array: true, nullable: true })
  copy_patient_citizenship_card: string[];

  @Column({ type: 'text', array: true, nullable: true })
  copy_patient_civil_registration: string[];

  @Column({ type: 'text', array: true, nullable: true })
  copy_parents_citizenship_card: string[];

  @Column({ type: 'text', array: true, nullable: true })
  copy_marriage_certificate: string[];

  @Column({ type: 'text', array: true, nullable: true })
  copy_cohabitation_certificate: string[];

  @Column({ type: 'date', nullable: true })
  date_of_admission: Date;

  @Column({ type: 'date', nullable: true })
  answer_date: Date;

  @Column({ type: 'date', nullable: true })
  download_expiration_date: Date;

  @Column({ enum: RequirementStatus, default: RequirementStatus.PENDING })
  request_status: RequirementStatus;

  @Column({ type: 'boolean', default: false })
  is_deleted: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @Column({ type: 'uuid', nullable: true })
  aplicantId: string;

  @Column({ nullable: true })
  medicalReqUserType: number;

  @ManyToOne(() => User, (user) => user.medical_req)
  @JoinColumn({ name: 'aplicantId' })
  aplicant: User;

  @ManyToOne(() => RequirementType, (req_type) => req_type.medical_req, {
    eager: true,
    cascade: true,
  })
  @JoinColumn({ name: 'requirement_type', referencedColumnName: 'id' })
  req_type: RequirementType;

  @Column()
  requirement_type: number;

  @ManyToOne(
    () => PatientClassStatus,
    (patient_class) => patient_class.medical_req,
    {
      eager: true,
      cascade: true,
    },
  )
  @JoinColumn({ name: 'patient_class_status', referencedColumnName: 'id' })
  patient_class: PatientClassStatus;

  @Column({ nullable: true })
  patient_class_status: number;

  @ManyToOne(
    () => RelWithPatient,
    (rel_with_patient) => rel_with_patient.medical_req,
    {
      eager: true,
      cascade: true,
    },
  )
  @JoinColumn({ name: 'relationship_with_patient', referencedColumnName: 'id' })
  rel_with_patient: RelWithPatient;

  @Column({ nullable: true })
  relationship_with_patient: number;
}
