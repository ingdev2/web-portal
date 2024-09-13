import { PartialType } from '@nestjs/swagger';
import { CreateRequirementStatusDto } from './create-requirement_status.dto';

export class UpdateRequirementStatusDto extends PartialType(CreateRequirementStatusDto) {}
