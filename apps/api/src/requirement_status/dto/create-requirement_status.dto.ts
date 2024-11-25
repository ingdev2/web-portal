import { IsEnum, IsNotEmpty } from 'class-validator';
import { RequirementStatusEnum } from 'src/utils/enums/requirement_status.enum';

export class CreateRequirementStatusDto {
  @IsNotEmpty()
  @IsEnum(RequirementStatusEnum)
  name: RequirementStatusEnum;
}
