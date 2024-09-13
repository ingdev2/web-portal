import { SetMetadata } from '@nestjs/common';

export const ENABLE_AUDIT_LOG = 'enableAuditLog';

export const EnableAuditLog = () => SetMetadata(ENABLE_AUDIT_LOG, true);
