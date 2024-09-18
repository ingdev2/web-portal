import { PartialType } from '@nestjs/swagger';
import { CreateIdTypeDto } from './create-id_type.dto';

export class UpdateIdTypeDto extends PartialType(CreateIdTypeDto) {}
