import { PartialType } from '@nestjs/swagger';
import { CreateGenderTypeDto } from './create-gender.dto';

export class UpdateGenderTypeDto extends PartialType(CreateGenderTypeDto) {}
