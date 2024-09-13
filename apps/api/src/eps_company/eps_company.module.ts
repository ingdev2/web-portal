import { Module } from '@nestjs/common';
import { EpsCompanyService } from './services/eps_company.service';
import { EpsCompanyController } from './controllers/eps_company.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EpsCompany } from './entities/eps_company.entity';
import { NodemailerModule } from 'src/nodemailer/nodemailer.module';
import { AuditLogsModule } from 'src/audit_logs/audit_logs.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([EpsCompany]),
    NodemailerModule,
    AuditLogsModule,
  ],
  controllers: [EpsCompanyController],
  providers: [EpsCompanyService],
})
export class EpsCompanyModule {}
