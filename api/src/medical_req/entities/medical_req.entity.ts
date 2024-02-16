import { User, UserIdType } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
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

  @PrimaryGeneratedColumn(uuidv4)
  filing_number: string;

  @Column()
  requirement_type: RequirementType;

  @Column({ type: 'boolean', default: false })
  right_petition: boolean;

  @Column({ type: 'text', nullable: true })
  copy_right_petition: string;

  @Column({ type: 'text', nullable: true })
  aplicant_name: string;

  @Column({ type: 'text', nullable: true })
  aplicant_last_name: string;

  @Column({ nullable: true })
  aplicant_id_type: UserIdType;

  @Column({ type: 'bigint', nullable: true })
  aplicant_id_number: number;

  @Column({ nullable: true })
  aplicant_email: string;

  @Column({ type: 'bigint', nullable: true })
  aplicant_cellphone: number;

  @Column()
  relationship_with_patient: RelationshipWithPatient;

  @Column()
  patient_id_type: UserIdType;

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

  @ManyToOne(() => User, (user) => user.medical_req)
  aplicant: User;
}
