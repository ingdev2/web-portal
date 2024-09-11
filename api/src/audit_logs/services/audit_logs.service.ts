import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditLogs } from '../entities/audit_logs.entity';
import { CreateAuditLogDto } from '../dto/create_audit_log.dto';

@Injectable()
export class AuditLogsService {
  constructor(
    @InjectRepository(AuditLogs)
    private auditLogsRepository: Repository<AuditLogs>,
  ) {}

  // CREATE FUNTIONS //

  async createAuditLog(createNewAuditLog: Partial<CreateAuditLogDto>) {
    const newAuditLog = this.auditLogsRepository.create(createNewAuditLog);

    return await this.auditLogsRepository.save(newAuditLog);
  }
}
