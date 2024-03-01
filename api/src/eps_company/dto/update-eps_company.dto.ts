import { PartialType } from '@nestjs/swagger';
import { CreateEpsCompanyDto } from './create-eps_company.dto';

export class UpdateEpsCompanyDto extends PartialType(CreateEpsCompanyDto) {}
