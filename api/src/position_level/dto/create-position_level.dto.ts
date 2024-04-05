import { IsEnum, IsNotEmpty } from 'class-validator';
import { PositionLevelEnum } from '../../common/enums/position_level.enum';

export class CreatePositionLevelDto {
  @IsNotEmpty()
  @IsEnum(PositionLevelEnum)
  name: PositionLevelEnum;
}
