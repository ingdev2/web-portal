import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { AdminRolType } from '../../utils/enums/admin_roles.enum';
import { UserRolType } from '../../utils/enums/user_roles.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<
      (AdminRolType | UserRolType)[]
    >(ROLES_KEY, [context.getHandler(), context.getClass()]);

    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    if (!user || !user.role || !user.role.name) {
      return false;
    }

    if (user.role.name === AdminRolType.SUPER_ADMIN) {
      return true;
    }

    const userRole = user.role.name;

    console.log('User Role: ', userRole);

    return requiredRoles.some((role) => role === userRole);
  }
}
