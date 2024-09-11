import { Module } from '@nestjs/common';
import { AdminsService } from './services/admins.service';
import { AdminsController } from './controllers/admins.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { AdminRole } from '../admin_roles/entities/admin_role.entity';
import { PositionLevel } from '../position_level/entities/position_level.entity';
import { CompanyArea } from 'src/company_area/entities/company_area.entity';
import { AuthenticationMethod } from 'src/authentication_method/entities/authentication_method.entity';
import { NodemailerModule } from 'src/nodemailer/nodemailer.module';
import { AuditLogsModule } from 'src/audit_logs/audit_logs.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Admin,
      AdminRole,
      PositionLevel,
      CompanyArea,
      AuthenticationMethod,
    ]),
    NodemailerModule,
    AuditLogsModule,
  ],
  controllers: [AdminsController],
  providers: [AdminsService],
  exports: [AdminsService],
})
export class AdminsModule {}
