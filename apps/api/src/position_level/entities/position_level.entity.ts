import { Admin } from '../../admins/entities/admin.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PositionLevelEnum } from '../../utils/enums/position_level.enum';

@Entity()
export class PositionLevel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ enum: PositionLevelEnum })
  name: PositionLevelEnum;

  @OneToMany(() => Admin, (admin) => admin.admin_position_level)
  admin: Admin[];
}
