import { IsEnum, IsNotEmpty } from 'class-validator';
import { IdType } from 'shared/utils/enums/id_type.enum';

export class CreateIdTypeDto {
  @IsNotEmpty()
  @IsEnum(IdType)
  name: IdType;
}
