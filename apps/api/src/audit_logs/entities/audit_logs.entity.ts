import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { ActionTypesEnum } from 'shared/utils/enums/audit_logs_enums/action_types.enum';
import { QueryTypesEnum } from 'shared/utils/enums/audit_logs_enums/query_types.enum';
import { ModuleNameEnum } from 'shared/utils/enums/audit_logs_enums/module_names.enum';

@Entity()
export class AuditLogs {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  user_name: string;

  @Column({ type: 'text' })
  user_id_number: string;

  @Column({ type: 'text' })
  user_email: string;

  @Column({ type: 'text' })
  user_role: string;

  @Column({ enum: ActionTypesEnum })
  action_type: ActionTypesEnum;

  @Column({ enum: QueryTypesEnum })
  query_type: QueryTypesEnum;

  @Column({ enum: ModuleNameEnum })
  module_name: ModuleNameEnum;

  @Column({ type: 'text', nullable: true })
  module_record_id: string;

  @Column({ type: 'text', nullable: true })
  ip_address: string;

  @Column({ type: 'text', nullable: true })
  is_mobile: string;

  @Column({ type: 'text', nullable: true })
  browser_version: string;

  @Column({ type: 'text', nullable: true })
  operating_system: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
