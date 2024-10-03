import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AuditLogsService } from '../services/audit_logs.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateAuditLogDto } from '../dto/create_audit_log.dto';
import { EnableAuditLog } from '../decorators/enable-audit-log.decorator';
import { Auth } from '../../auth/decorators/auth.decorator';
import { AdminRolType } from '../../utils/enums/admin_roles.enum';

@ApiTags('audit-logs')
@ApiBearerAuth()
@Controller('audit-logs')
export class AuditLogsController {
  constructor(private readonly auditLogsService: AuditLogsService) {}

  // GET METHODS //

  @Auth(AdminRolType.SUPER_ADMIN, AdminRolType.ADMIN)
  @Get('/getAll')
  async getAllAuditLogs() {
    return this.auditLogsService.getAllAuditLogs();
  }

  // POST METHODS //

  @EnableAuditLog()
  @Post('/create')
  async createAuditLog(
    @Body() createAuditLogDto: Partial<CreateAuditLogDto>,
    @Req() requestAuditLog: any,
  ) {
    const auditLogData = {
      ...requestAuditLog.auditLogData,
      ...createAuditLogDto,
    };

    return await this.auditLogsService.createAuditLog(auditLogData);
  }
}
