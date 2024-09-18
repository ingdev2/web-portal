import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AuthenticationMethodEnum } from 'shared/utils/enums/authentication_method.enum';
import { Admin } from 'src/admins/entities/admin.entity';
import { User } from '../../users/entities/user.entity';
import { AuthorizedFamiliar } from '../../authorized_familiar/entities/authorized_familiar.entity';

@Entity()
export class AuthenticationMethod {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ enum: AuthenticationMethodEnum })
  name: AuthenticationMethodEnum;

  @OneToMany(() => Admin, (admin) => admin.admin_authentication_method)
  admin: Admin[];

  @OneToMany(() => User, (user) => user.user_authentication_method)
  user: User[];

  @OneToMany(
    () => AuthorizedFamiliar,
    (familiar) => familiar.familiar_authentication_method,
  )
  familiar: AuthorizedFamiliar[];
}
