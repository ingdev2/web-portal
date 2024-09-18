import { PartialType } from '@nestjs/swagger';
import { CreateAuthenticationMethodDto } from './create-authentication_method.dto';

export class UpdateAuthenticationMethodDto extends PartialType(CreateAuthenticationMethodDto) {}
