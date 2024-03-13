import { User } from '../../users/entities/user.entity';
import { RequirementType } from '../../requirement_type/entities/requirement_type.entity';
import { RequirementStatus } from '../../requirement_status/entities/requirement_status.entity';
import { PatientClassStatus } from '../../patient_class_status/entities/patient_class_status.entity';
import { AuthorizedFamiliar } from '../../authorized_familiar/entities/authorized_familiar.entity';
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

@Entity()
export class MedicalReq {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ generated: 'uuid' })
  filing_number: string;

  @ManyToOne(() => RequirementType, (req_type) => req_type.medical_req)
  @JoinColumn({ name: 'requirement_type', referencedColumnName: 'id' })
  req_type: RequirementType;

  @Column()
  requirement_type: number;

  @Column({ type: 'boolean', default: false })
  right_petition: boolean;

  @Column({ type: 'text', array: true, nullable: true })
  copy_right_petition: string[];

  @Column({ nullable: true })
  medicalReqUserType: number;

  @ManyToOne(() => AuthorizedFamiliar, (familiar) => familiar.medical_req)
  @JoinColumn({ name: 'familiar_id', referencedColumnName: 'id' })
  familiar: AuthorizedFamiliar;

  @Column({ type: 'uuid', nullable: true })
  familiar_id: string;

  @Column({ type: 'uuid', nullable: true })
  aplicantId: string;

  @ManyToOne(
    () => PatientClassStatus,
    (patient_class) => patient_class.medical_req,
  )
  @JoinColumn({ name: 'patient_class_status', referencedColumnName: 'id' })
  patient_class: PatientClassStatus;

  @Column({ nullable: true })
  patient_class_status: number;

  @Column()
  patient_id_type: number;

  @Column({ type: 'bigint' })
  patient_id_number: number;

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
  aplicant_eps_company: number;

  @Column({ nullable: true })
  aplicant_company_area: number;

  @Column({ type: 'boolean', default: false })
  accept_terms: boolean;

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

  @Column({ type: 'boolean', default: false })
  is_deleted: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => User, (aplicant) => aplicant.medical_req)
  aplicant: User;

  @Column({ type: 'boolean', default: false })
  in_legal_area: boolean;

  @ManyToOne(() => RequirementStatus, (req_status) => req_status.medical_req)
  @JoinColumn({ name: 'requirement_status', referencedColumnName: 'id' })
  req_status: RequirementStatus;

  @Column({ nullable: true })
  requirement_status: number;

  @Column({ type: 'text', array: true, nullable: true })
  sent_documents: string[];

  @Column({ type: 'text', nullable: true })
  comments: string;
}
