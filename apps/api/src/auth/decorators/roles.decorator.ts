import { SetMetadata } from '@nestjs/common';
import { AdminRolType } from 'shared/utils/enums/admin_roles.enum';
import { UserRolType } from 'shared/utils/enums/user_roles.enum';

export const ROLES_KEY = [];
export const Roles = (...roles: (AdminRolType | UserRolType)[]) =>
  SetMetadata(ROLES_KEY, roles);
