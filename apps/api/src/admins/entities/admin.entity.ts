import { AdminRole } from '../../admin_roles/entities/admin_role.entity';
import { GenderType } from '../../genders/entities/gender.entity';
import { IdTypeEntity } from '../../id_types/entities/id_type.entity';
import { CompanyArea } from '../../company_area/entities/company_area.entity';
import { PositionLevel } from '../../position_level/entities/position_level.entity';
import { AuthenticationMethod } from 'src/authentication_method/entities/authentication_method.entity';
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
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text' })
  last_name: string;

  @Column({ type: 'bigint', unique: true })
  id_number: number;

  @Column({ unique: true })
  corporate_email: string;

  @Column({ select: false })
  password: string;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => AdminRole, (role) => role.admin, {
    eager: true,
    cascade: true,
  })
  @JoinColumn({ name: 'admin_role', referencedColumnName: 'id' })
  role: AdminRole;

  @Column()
  admin_role: number;

  @ManyToOne(() => GenderType, (gender) => gender.admin)
  @JoinColumn({ name: 'admin_gender', referencedColumnName: 'id' })
  gender: GenderType;

  @Column()
  admin_gender: number;

  @ManyToOne(() => IdTypeEntity, (id_type) => id_type.admin)
  @JoinColumn({ name: 'admin_id_type', referencedColumnName: 'id' })
  id_type: IdTypeEntity;

  @Column()
  admin_id_type: number;

  @ManyToOne(
    () => CompanyArea,
    (company_admin_area) => company_admin_area.admin,
  )
  @JoinColumn({ name: 'company_area', referencedColumnName: 'id' })
  company_admin_area: CompanyArea;

  @Column()
  company_area: number;

  @ManyToOne(
    () => PositionLevel,
    (admin_position_level) => admin_position_level.admin,
  )
  @JoinColumn({ name: 'position_level', referencedColumnName: 'id' })
  admin_position_level: PositionLevel;

  @Column({ nullable: true })
  position_level: number;

  @ManyToOne(
    () => AuthenticationMethod,
    (admin_authentication_method) => admin_authentication_method.admin,
  )
  @JoinColumn({ name: 'authentication_method', referencedColumnName: 'id' })
  admin_authentication_method: AuthenticationMethod;

  @Column({ nullable: true })
  authentication_method: number;

  @Column({ nullable: true })
  verification_code: number;

  @Column({ nullable: true })
  reset_password_token: string;
}
