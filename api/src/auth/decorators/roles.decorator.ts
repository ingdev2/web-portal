import { SetMetadata } from '@nestjs/common';
import { AdminRolType } from 'src/admins/entities/admin.entity';
import { UserRolType } from 'src/users/entities/user.entity';

export const ROLES_KEY = [];
export const Roles = (...roles: AdminRolType[] | UserRolType[]) =>
  SetMetadata(ROLES_KEY, roles);
