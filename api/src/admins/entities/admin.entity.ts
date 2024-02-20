import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum AdminGender {
  MALE = 'Masculino',
  FEMALE = 'Femenino',
}

export enum AdminIdType {
  CITIZENSHIP_CARD = 'Cédula de Ciudadanía',
  FOREIGNER_ID = 'Cédula de Extranjería',
  CIVIL_REGISTRATION = 'Registro Civil',
  PASSPORT = 'Pasaporte',
}

export enum AdminCompanyArea {
  SYSTEM_DEPARTAMENT = 'Departamento de Sistemas',
  ARCHIVES_DEPARTAMENT = 'Departamento de Archivos',
  LEGAL_DEPARTAMENT = 'Departamento de Jurídico',
}

export enum AdminRolType {
  SUPER_ADMIN = 'Super Admin',
  ADMIN = 'Admin',
}

@Entity()
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text' })
  last_name: string;

  @Column()
  gender: AdminGender;

  @Column()
  id_type: AdminIdType;

  @Column({ type: 'bigint', unique: true })
  id_number: number;

  @Column()
  corporate_email: string;

  @Column()
  password: string;

  @Column()
  company_area: AdminCompanyArea;

  @Column({ default: AdminRolType.ADMIN })
  role: AdminRolType;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
