import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum UserGender {
  MALE = 'Masculino',
  FEMALE = 'Femenino',
}

export enum UserIdType {
  CITIZENSHIP_CARD = 'Cédula de Ciudadanía',
  FOREIGNER_ID = 'Cédula de Extranjería',
  CIVIL_REGISTRATION = 'Registro Civil',
  PASSPORT = 'Pasaporte',
}

export enum UserRolType {
  PERSON = 'Persona',
  EPS = 'Eps',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text' })
  last_name: string;

  @Column()
  gender: UserGender;

  @Column({ type: 'date', nullable: true })
  birthay_date: Date;

  @Column({ nullable: true })
  company_name: string;

  @Column()
  id_type: UserIdType;

  @Column({ type: 'bigint', unique: true })
  id_number: number;

  @Column({ type: 'date', nullable: true })
  id_exp_date: Date;

  @Column()
  email: string;

  @Column({ type: 'bigint', nullable: true })
  cellphone: number;

  @Column()
  password: string;

  @Column({ nullable: true })
  company_area: string;

  @Column({ default: UserRolType.PERSON })
  rol: UserRolType;

  @Column({ nullable: true })
  residence_department: string;

  @Column({ nullable: true })
  residence_city: string;

  @Column({ nullable: true })
  residence_address: string;

  @Column({ nullable: true })
  residence_neighborhood: string;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
