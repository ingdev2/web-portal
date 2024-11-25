import { IsEnum, IsNotEmpty } from 'class-validator';
import { RequirementTypeEnum } from 'src/utils/enums/requirement_type.enum';

export class CreateRequirementTypeDto {
  @IsNotEmpty()
  @IsEnum(RequirementTypeEnum)
  name: RequirementTypeEnum;
}
