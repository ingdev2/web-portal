import { PartialType } from '@nestjs/swagger';
import { CreateAuthorizedFamiliarDto } from './create-authorized_familiar.dto';

export class UpdateAuthorizedFamiliarDto extends PartialType(CreateAuthorizedFamiliarDto) {}
