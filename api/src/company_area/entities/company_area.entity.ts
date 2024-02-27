import { Admin } from '../..//admins/entities/admin.entity';
import { User } from '../../users/entities/user.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CompanyAreaEnum } from '../../common/enums/company_area.enum';

@Entity()
export class CompanyArea {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ enum: CompanyAreaEnum })
  name: CompanyAreaEnum;

  @OneToMany(() => Admin, (admin) => admin.companyArea)
  admin: Admin[];

  @OneToMany(() => User, (user) => user.companyArea)
  user: User[];
}
