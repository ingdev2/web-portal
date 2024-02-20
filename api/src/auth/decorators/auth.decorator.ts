import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guard/auth.guard';
import { RolesGuard } from '../guard/roles.guard';
import { Roles } from './roles.decorator';
import { AdminRolType } from 'src/admins/entities/admin.entity';
import { UserRolType } from 'src/users/entities/user.entity';

export function Auth(...roles: AdminRolType[] | UserRolType[]) {
  return applyDecorators(Roles(...roles), UseGuards(AuthGuard, RolesGuard));
}
