import { Gender } from '../../common/enums/gender.enum';
import { IdType } from '../../common/enums/id_type.enum';
import { AdminCompanyArea } from '../../common/enums/admin_company_area.enum';
import { AdminRolType } from '../../common/enums/admin_roles.enum';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
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

  @Column({ enum: Gender })
  gender: Gender;

  @Column({ enum: IdType })
  id_type: IdType;

  @Column({ type: 'bigint', unique: true })
  id_number: number;

  @Column()
  corporate_email: string;

  @Column({ select: false })
  password: string;

  @Column({ enum: AdminCompanyArea })
  company_area: AdminCompanyArea;

  @Column({ enum: AdminRolType, default: AdminRolType.ADMIN })
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
