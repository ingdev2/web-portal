import { PartialType } from '@nestjs/swagger';
import { CreateRequirementTypeDto } from './create-requirement_type.dto';

export class UpdateRequirementTypeDto extends PartialType(CreateRequirementTypeDto) {}
