import { Admin } from '../..//admins/entities/admin.entity';
import { User } from '../../users/entities/user.entity';
import { Gender } from '../../common/enums/gender.enum';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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
