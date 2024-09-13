import { Module } from '@nestjs/common';
import { AuditLogsService } from './services/audit_logs.service';
import { AuditLogsController } from './controllers/audit_logs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuditLogs } from './entities/audit_logs.entity';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AuditLogsInterceptor } from './interceptors/audit_logs.interceptor';

@Module({
  imports: [TypeOrmModule.forFeature([AuditLogs])],
  controllers: [AuditLogsController],
  providers: [
    AuditLogsService,
    {
      provide: APP_INTERCEPTOR,
      useClass: AuditLogsInterceptor,
    },
  ],
  exports: [AuditLogsService],
})
export class AuditLogsModule {}
