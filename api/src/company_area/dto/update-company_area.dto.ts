import { PartialType } from '@nestjs/swagger';
import { CreateCompanyAreaDto } from './create-company_area.dto';

export class UpdateCompanyAreaDto extends PartialType(CreateCompanyAreaDto) {}
