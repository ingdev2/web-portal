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
import { AdminRole } from '../../admin_roles/entities/admin_role.entity';
import { GenderType } from '../../genders/entities/gender.entity';
import { IdTypeEntity } from '../../id_types/entities/id_type.entity';
import { CompanyArea } from '../../company_area/entities/company_area.entity';

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

  @Column()
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

  @ManyToOne(() => CompanyArea, (companyArea) => companyArea.admin)
  @JoinColumn({ name: 'company_area', referencedColumnName: 'id' })
  companyArea: CompanyArea;

  @Column()
  company_area: number;
}
