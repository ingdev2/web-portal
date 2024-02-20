import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { UserRolType } from 'src/users/entities/user.entity';
import { AdminRolType } from 'src/admins/entities/admin.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<
      UserRolType[],
      AdminRolType[]
    >(ROLES_KEY, [context.getHandler(), context.getClass()]);

    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    if (user.role === AdminRolType.SUPER_ADMIN) {
      return true;
    }

    return requiredRoles.some((rol) => user.role?.includes(rol));
  }
}
