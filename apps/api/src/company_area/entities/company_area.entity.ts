import { Admin } from '../../admins/entities/admin.entity';
import { User } from '../../users/entities/user.entity';
import { MedicalReq } from '../../medical_req/entities/medical_req.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CompanyAreaEnum } from 'shared/utils/enums/company_area.enum';

@Entity()
export class CompanyArea {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ enum: CompanyAreaEnum })
  name: CompanyAreaEnum;

  @OneToMany(() => Admin, (admin) => admin.company_admin_area)
  admin: Admin[];

  @OneToMany(() => User, (user) => user.company_user_area)
  user: User[];

  @OneToMany(() => MedicalReq, (medical_req) => medical_req.review_area)
  medical_req: MedicalReq[];
}
