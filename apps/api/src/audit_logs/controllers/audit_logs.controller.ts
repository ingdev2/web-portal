import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuditLogsService } from '../services/audit_logs.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateAuditLogDto } from '../dto/create_audit_log.dto';
import { EnableAuditLog } from '../decorators/enable-audit-log.decorator';

@ApiTags('audit-logs')
@ApiBearerAuth()
@Controller('audit-logs')
export class AuditLogsController {
  constructor(private readonly auditLogsService: AuditLogsService) {}

  // POST METHODS //

  @EnableAuditLog()
  @Post('/createAuditLog')
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
