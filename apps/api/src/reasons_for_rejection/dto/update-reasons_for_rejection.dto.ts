import { PartialType } from '@nestjs/swagger';
import { CreateReasonsForRejectionDto } from './create-reasons_for_rejection.dto';

export class UpdateReasonsForRejectionDto extends PartialType(CreateReasonsForRejectionDto) {}
