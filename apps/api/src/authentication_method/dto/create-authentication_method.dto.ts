import { IsEnum, IsNotEmpty } from 'class-validator';
import { AuthenticationMethodEnum } from '../../utils/enums/authentication_method.enum';

export class CreateAuthenticationMethodDto {
  @IsNotEmpty()
  @IsEnum(AuthenticationMethodEnum)
  name: AuthenticationMethodEnum;
}
