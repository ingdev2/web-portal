import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { AdminRolType } from '../../common/enums/admin_roles.enum';
import { UserRolType } from '../../common/enums/user_roles.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<
      UserRolType[],
      AdminRolType[]
    >(ROLES_KEY, [context.getHandler(), context.getClass()]);

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    if (!user) {
      return false;
    }

    if (user.role === AdminRolType.SUPER_ADMIN) {
      return true;
    }

    const userRole = [user.role.name];

    return requiredRoles.some((role) => userRole.includes(role));
  }
}
