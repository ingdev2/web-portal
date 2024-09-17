import { User } from '../../users/entities/user.entity';
import { AuthorizedFamiliar } from '../../authorized_familiar/entities/authorized_familiar.entity';
import { UserRolType } from 'shared/utils/enums/user_roles.enum';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserRole {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ enum: UserRolType, default: UserRolType.PATIENT })
  name: UserRolType;

  @OneToMany(() => User, (user) => user.role)
  user: User[];

  @OneToMany(() => AuthorizedFamiliar, (familiar) => familiar.role)
  familiar: AuthorizedFamiliar[];
}
