import { RequirementTypeEnum } from 'src/utils/enums/requirement_type.enum';
import { MedicalReq } from '../../medical_req/entities/medical_req.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RequirementType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ enum: RequirementTypeEnum })
  name: RequirementTypeEnum;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @OneToMany(() => MedicalReq, (medical_req) => medical_req.req_type)
  medical_req: MedicalReq[];
}
