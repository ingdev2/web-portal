import { User } from '../../users/entities/user.entity';
import { IdType } from '../../common/enums/id_type.enum';
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

export enum RequirementType {
  MEDICAL_RESULTS = 'Resultados Médicos',
  CLINIC_HISTORY = 'Historia Clínica',
  MEDICAL_ORDER = 'Orden Médica',
  MEDICAL_DISABILITY = 'Incapacidad Médica',
}

export enum PatientClassificationStatus {
  YOUNGER = 'Menor de edad',
  ADULT = 'Adulto',
  DECEASED = 'Fallecido',
}

export enum RelationshipWithPatient {
  PARENT = 'Padre/Madre',
  SON = 'Hijo(a)',
  BROTHER = 'Hermano(a)',
  SPOUSE = 'Esposo(a)',
  FAMILIAR = 'Familiar',
}

export enum RequestStatus {
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

  @Column()
  requirement_type: RequirementType;

  @Column({ type: 'boolean', default: false })
  right_petition: boolean;

  @Column({ type: 'text', array: true, nullable: true })
  copy_right_petition: string[];

  @Column({ type: 'text', nullable: true })
  aplicant_name: string;

  @Column({ type: 'text', nullable: true })
  aplicant_last_name: string;

  @Column({ type: 'text', nullable: true })
  aplicant_gender: string;

  @Column({ enum: IdType, nullable: true })
  aplicant_id_type: IdType;

  @Column({ type: 'bigint', nullable: true })
  aplicant_id_number: number;

  @Column({ nullable: true })
  aplicant_email: string;

  @Column({ type: 'bigint', nullable: true })
  aplicant_cellphone: number;

  @Column({ nullable: true })
  aplicant_company_name: string;

  @Column({ nullable: true })
  aplicant_company_area: string;

  @Column({ enum: RelationshipWithPatient, nullable: true })
  relationship_with_patient: RelationshipWithPatient;

  @Column({ enum: IdType })
  patient_id_type: IdType;

  @Column({ type: 'bigint' })
  patient_id_number: number;

  @Column({ type: 'date', nullable: true })
  patient_id_exp_date: Date;

  @Column({ enum: PatientClassificationStatus, nullable: true })
  patient_class_status: PatientClassificationStatus;

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

  @Column({ enum: RequestStatus, default: RequestStatus.PENDING })
  request_status: RequestStatus;

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
}
