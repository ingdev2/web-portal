import { Admin } from '../..//admins/entities/admin.entity';
import { User } from '../../users/entities/user.entity';
import { IdType } from '../../utils/enums/id_type.enum';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class IdTypeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ enum: IdType })
  name: IdType;

  @OneToMany(() => Admin, (admin) => admin.id_type)
  admin: Admin[];

  @OneToMany(() => User, (user) => user.id_type)
  user: User[];
}
