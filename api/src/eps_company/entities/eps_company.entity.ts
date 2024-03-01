import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class EpsCompany {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nit: string;

  @Column()
  name: string;

  @OneToMany(() => User, (user) => user.eps)
  user: User[];
}
