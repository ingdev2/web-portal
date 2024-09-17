import { IsEnum, IsNotEmpty } from 'class-validator';
import { CompanyAreaEnum } from 'shared/utils/enums/company_area.enum';

export class CreateCompanyAreaDto {
  @IsNotEmpty()
  @IsEnum(CompanyAreaEnum)
  name: CompanyAreaEnum;
}
