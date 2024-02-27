import { MedicalReq } from '../../medical_req/entities/medical_req.entity';
import { Gender } from '../../common/enums/gender.enum';
import { IdType } from '../../common/enums/id_type.enum';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserRole } from '../../user_roles/entities/user_role.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text' })
  last_name: string;

  @Column({ enum: Gender })
  gender: Gender;

  @Column({ type: 'date', nullable: true })
  birthay_date: Date;

  @Column({ nullable: true })
  company_name: string;

  @Column({ nullable: true })
  company_area: string;

  @Column({ enum: IdType })
  id_type: IdType;

  @Column({ type: 'bigint', unique: true })
  id_number: number;

  @Column({ type: 'date', nullable: true })
  id_exp_date: Date;

  @Column()
  email: string;

  @Column({ type: 'bigint', nullable: true })
  cellphone: number;

  @Column({ select: false })
  password: string;

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

  @OneToMany(() => MedicalReq, (medical_req) => medical_req.aplicant, {
    eager: true,
    cascade: true,
  })
  medical_req: MedicalReq[];

  @OneToOne(() => UserRole, (role) => role.user, {
    eager: true,
    cascade: true,
  })
  @JoinColumn({ name: 'user_role', referencedColumnName: 'id' })
  role: UserRole;

  @Column()
  user_role: number;
}
