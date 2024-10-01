import { IsEnum, IsNotEmpty } from 'class-validator';
import { PositionLevelEnum } from '../../utils/enums/position_level.enum';

export class CreatePositionLevelDto {
  @IsNotEmpty()
  @IsEnum(PositionLevelEnum)
  name: PositionLevelEnum;
}
