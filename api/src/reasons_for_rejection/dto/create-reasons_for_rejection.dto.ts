import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class CreateReasonsForRejectionDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  @MaxLength(50)
  rejection_title: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(20)
  @MaxLength(200)
  reason_message: string;
}
