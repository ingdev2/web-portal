import { UserRole } from '../../user_roles/entities/user_role.entity';
import { GenderType } from '../../genders/entities/gender.entity';
import { IdTypeEntity } from '../../id_types/entities/id_type.entity';
import { EpsCompany } from '../../eps_company/entities/eps_company.entity';
import { CompanyArea } from '../../company_area/entities/company_area.entity';
import { MedicalReq } from '../../medical_req/entities/medical_req.entity';
import { AuthorizedFamiliar } from '../../authorized_familiar/entities/authorized_familiar.entity';
import { AuthenticationMethod } from '../../authentication_method/entities/authentication_method.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: true })
  name: string;

  @Column({ type: 'text', nullable: true })
  last_name: string;

  @Column({ type: 'bigint', unique: true })
  id_number: number;

  @Column({ type: 'date', nullable: true })
  birthdate: Date;

  @Column({ unique: true })
  email: string;

  @Column({ type: 'bigint', nullable: true })
  cellphone: number;

  @Column({ type: 'bigint', nullable: true })
  whatsapp: number;

  @Column({ select: false })
  password: string;

  @Column({ nullable: true })
  affiliation_eps: string;

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

  @Column({ type: 'boolean', default: false })
  accept_terms: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => MedicalReq, (medical_req) => medical_req.aplicant, {
    eager: true,
    cascade: true,
  })
  medical_req: MedicalReq[];

  @ManyToOne(() => UserRole, (role) => role.user, {
    eager: true,
    cascade: true,
  })
  @JoinColumn({ name: 'user_role', referencedColumnName: 'id' })
  role: UserRole;

  @Column()
  user_role: number;

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

  @ManyToOne(() => EpsCompany, (eps) => eps.user)
  @JoinColumn({ name: 'eps_company', referencedColumnName: 'id' })
  eps: EpsCompany;

  @Column({ nullable: true })
  eps_company: number;

  @ManyToOne(() => CompanyArea, (company_user_area) => company_user_area.user)
  @JoinColumn({ name: 'company_area', referencedColumnName: 'id' })
  company_user_area: CompanyArea;

  @Column({ nullable: true })
  company_area: number;

  @ManyToOne(
    () => AuthenticationMethod,
    (user_authentication_method) => user_authentication_method.user,
  )
  @JoinColumn({ name: 'authentication_method', referencedColumnName: 'id' })
  user_authentication_method: AuthenticationMethod;

  @Column({ nullable: true })
  authentication_method: number;

  @ManyToMany(() => AuthorizedFamiliar, {
    eager: true,
    cascade: true,
  })
  @JoinTable({ name: 'patientUsers_authorizedRelatives' })
  familiar: AuthorizedFamiliar[];

  @Column({ nullable: true })
  verification_code: number;

  @Column({ nullable: true })
  reset_password_token: string;
}
