import { UserRolType } from '../../common/enums/user_roles.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserRole {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ enum: UserRolType, default: UserRolType.PERSON })
  role: UserRolType;
}
