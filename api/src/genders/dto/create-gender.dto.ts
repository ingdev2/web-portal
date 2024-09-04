import { IsEnum, IsNotEmpty } from 'class-validator';
import { Gender } from '../../utils/enums/gender.enum';

export class CreateGenderTypeDto {
  @IsNotEmpty()
  @IsEnum(Gender)
  name: Gender;
}
