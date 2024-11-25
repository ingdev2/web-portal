import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class EpsCompany {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  nit: string;

  @Column({ unique: true })
  name: string;

  @Column({ unique: true, nullable: true })
  main_email: string;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @OneToMany(() => User, (user) => user.eps)
  user: User[];
}
