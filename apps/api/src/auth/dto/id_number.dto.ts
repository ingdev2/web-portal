import { IsNotEmpty } from 'class-validator';

export class IdNumberDto {
  @IsNotEmpty()
  id_type: number;

  @IsNotEmpty()
  id_number: number;
}
