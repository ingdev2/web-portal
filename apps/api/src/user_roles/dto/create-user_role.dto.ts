import { IsEnum, IsNotEmpty } from 'class-validator';
import { UserRolType } from 'shared/utils/enums/user_roles.enum';

export class CreateUserRoleDto {
  @IsNotEmpty()
  @IsEnum(UserRolType)
  name: UserRolType;
}
