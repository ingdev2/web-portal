import { IsNotEmpty, IsString } from 'class-validator';

export class SelectLocationDto {
  @IsNotEmpty()
  @IsString()
  department_name: string;

  @IsNotEmpty()
  @IsString()
  city_name: string;
}
