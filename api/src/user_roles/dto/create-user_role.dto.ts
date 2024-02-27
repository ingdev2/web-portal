import { IsEnum, IsNotEmpty } from 'class-validator';
import { UserRolType } from 'src/common/enums/user_roles.enum';

export class CreateUserRoleDto {
  @IsNotEmpty()
  @IsEnum(UserRolType)
  name: UserRolType;
}
