import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ReasonsForRejection {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  rejection_title: string;

  @Column()
  reason_message: string;
}
