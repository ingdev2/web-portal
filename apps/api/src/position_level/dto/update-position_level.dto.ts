import { PartialType } from '@nestjs/swagger';
import { CreatePositionLevelDto } from './create-position_level.dto';

export class UpdatePositionLevelDto extends PartialType(CreatePositionLevelDto) {}
