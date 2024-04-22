import { Admin } from '../..//admins/entities/admin.entity';
import { User } from '../../users/entities/user.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Gender } from '../../utils/enums/gender.enum';

@Entity()
export class GenderType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ enum: Gender })
  name: Gender;

  @OneToMany(() => Admin, (admin) => admin.gender)
  admin: Admin[];

  @OneToMany(() => User, (user) => user.gender)
  user: User[];
}
