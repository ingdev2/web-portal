import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AuthenticationMethodEnum } from '../../common/enums/authentication_method.enum';
import { User } from '../../users/entities/user.entity';

@Entity()
export class AuthenticationMethod {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ enum: AuthenticationMethodEnum })
  name: AuthenticationMethodEnum;

  @OneToMany(() => User, (user) => user.user_authentication_method)
  user: User[];
}
