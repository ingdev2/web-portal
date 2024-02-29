import { SetMetadata } from '@nestjs/common';
import { AdminRolType } from '../../common/enums/admin_roles.enum';
import { UserRolType } from '../../common/enums/user_roles.enum';

export const ROLES_KEY = [];
export const Roles = (...roles: (AdminRolType | UserRolType)[]) =>
  SetMetadata(ROLES_KEY, roles);
