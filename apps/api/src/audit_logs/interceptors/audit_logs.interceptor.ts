import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ENABLE_AUDIT_LOG } from '../decorators/enable-audit-log.decorator';

@Injectable()
export class AuditLogsInterceptor implements NestInterceptor {
  constructor(private reflector: Reflector) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    const NOT_REGISTER = 'NO REGISTRA';

    const requestAuditLog = context.switchToHttp().getRequest();
    const headers = requestAuditLog.headers;
    const ip = requestAuditLog.ip;

    const handler = context.getHandler();
    const enableAuditLog = this.reflector.get<boolean>(
      ENABLE_AUDIT_LOG,
      handler,
    );

    if (enableAuditLog) {
      requestAuditLog.auditLogData = {
        user_name: requestAuditLog.user?.name || NOT_REGISTER,
        user_id_number: requestAuditLog.user?.id_number || NOT_REGISTER,
        user_email: requestAuditLog.user?.email || NOT_REGISTER,
        user_role: requestAuditLog.user?.role?.name || NOT_REGISTER,
        is_mobile: headers['sec-ch-ua-mobile'] || NOT_REGISTER,
        browser_version: headers['sec-ch-ua'] || NOT_REGISTER,
        operating_system: headers['sec-ch-ua-platform'] || NOT_REGISTER,
        ip_address: ip || NOT_REGISTER,
      };
    }

    return next.handle();
  }
}
