import { IsEnum, IsNotEmpty } from 'class-validator';
import { RequirementTypeEnum } from '../../medical_req/enums/requirement_type.enum';

export class CreateRequirementTypeDto {
  @IsNotEmpty()
  @IsEnum(RequirementTypeEnum)
  name: RequirementTypeEnum;
}
