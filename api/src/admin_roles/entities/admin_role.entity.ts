import { Admin } from 'src/admins/entities/admin.entity';
import { AdminRolType } from 'src/common/enums/admin_roles.enum';
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
