import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AuthenticationMethodEnum } from '../../utils/enums/authentication_method.enum';
import { User } from '../../users/entities/user.entity';
import { AuthorizedFamiliar } from '../../authorized_familiar/entities/authorized_familiar.entity';

@Entity()
export class AuthenticationMethod {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ enum: AuthenticationMethodEnum })
  name: AuthenticationMethodEnum;

  @OneToMany(() => User, (user) => user.user_authentication_method)
  user: User[];

  @OneToMany(
    () => AuthorizedFamiliar,
    (familiar) => familiar.familiar_authentication_method,
  )
  familiar: AuthorizedFamiliar[];
}
