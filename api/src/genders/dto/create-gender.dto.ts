import { IsEnum, IsNotEmpty } from 'class-validator';
import { Gender } from '../../common/enums/gender.enum';

export class CreateGenderTypeDto {
  @IsNotEmpty()
  @IsEnum(Gender)
  name: Gender;
}
