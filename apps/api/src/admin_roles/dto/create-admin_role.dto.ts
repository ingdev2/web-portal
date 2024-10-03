import { IsEnum, IsNotEmpty } from 'class-validator';
import { AdminRolType } from '../../utils/enums/admin_roles.enum';

export class CreateAdminRoleDto {
  @IsNotEmpty()
  @IsEnum(AdminRolType)
  name: AdminRolType;
}
