import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RequirementStatusEnum } from '../../medical_req/enums/requirement_status.enum';
import { MedicalReq } from '../../medical_req/entities/medical_req.entity';

@Entity()
export class RequirementStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    enum: RequirementStatusEnum,
    default: RequirementStatusEnum.PENDING,
  })
  name: RequirementStatusEnum;

  @OneToMany(() => MedicalReq, (medical_req) => medical_req.req_status)
  medical_req: MedicalReq[];
}
