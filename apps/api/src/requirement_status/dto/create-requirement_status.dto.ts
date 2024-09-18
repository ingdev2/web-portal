import { IsEnum, IsNotEmpty } from 'class-validator';
import { RequirementStatusEnum } from '../../medical_req/enums/requirement_status.enum';

export class CreateRequirementStatusDto {
  @IsNotEmpty()
  @IsEnum(RequirementStatusEnum)
  name: RequirementStatusEnum;
}
