import { Admin } from '../../admins/entities/admin.entity';
import { AdminRolType } from 'shared/utils/enums/admin_roles.enum';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AdminRole {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ enum: AdminRolType, default: AdminRolType.ADMIN })
  name: AdminRolType;

  @OneToMany(() => Admin, (admin) => admin.role)
  admin: Admin[];
}
