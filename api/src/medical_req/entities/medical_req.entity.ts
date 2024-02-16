import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

export enum RequirementType {
  MEDICAL_RESULTS = 'Resultados Médicos',
  CLINIC_HISTORY = 'Historia Clínica',
  MEDICAL_ORDER = 'Orden Médica',
  MEDICAL_DISABILITY = 'Incapacidad Médica',
}

export enum MedicalReqIdType {
  CITIZENSHIP_CARD = 'Cédula de Ciudadanía',
  FOREIGNER_ID = 'Cédula de Extranjería',
  CIVIL_REGISTRATION = 'Registro Civil',
  PASSPORT = 'Pasaporte',
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

  @Column({ type: 'varchar', length: 8, unique: true })
  filing_number: string = uuidv4().slice(0, 8);

  @Column()
  requirement_type: RequirementType;

  @Column({ type: 'boolean', default: false })
  right_petition: boolean;

  @Column({ type: 'text', nullable: true })
  copy_right_petition: string;

  @Column({ type: 'text' })
  aplicant_name: string;

  @Column({ type: 'text' })
  aplicant_last_name: string;

  @Column()
  aplicant_id_type: MedicalReqIdType;

  @Column({ type: 'bigint' })
  id_number: number;

  @Column()
  aplicant_email: string;

  @Column({ type: 'bigint', nullable: true })
  aplicant_cellphone: number;

  @Column()
  relationship_with_patient: RelationshipWithPatient;

  @Column()
  patient_id_type: MedicalReqIdType;

  @Column({ type: 'bigint' })
  patient_id_number: number;

  @Column({ type: 'text', nullable: true })
  copy_applicant_citizenship_card: string;

  @Column({ type: 'text', nullable: true })
  copy_patient_citizenship_card: string;

  @Column({ type: 'text', nullable: true })
  copy_patient_civil_registration: string;

  @Column({ type: 'text', nullable: true })
  copy_parents_citizenship_card: string;

  @Column({ type: 'text', nullable: true })
  copy_marriage_certicate: string;

  @Column({ type: 'text', nullable: true })
  copy_cohabitation_certificate: string;

  @Column({ type: 'date' })
  date_of_admission: Date;

  @Column({ type: 'date', nullable: true })
  answer_date: Date;

  @Column({ type: 'date', nullable: true })
  download_expiration_date: Date;

  @Column({ default: RequestStatus.PENDING })
  request_status: RequestStatus;

  @Column({ type: 'boolean', default: false })
  is_deleted: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
