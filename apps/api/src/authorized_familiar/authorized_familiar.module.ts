import { AuthorizedFamiliar } from './entities/authorized_familiar.entity';
import { User } from '../users/entities/user.entity';
import { UserRole } from '../user_roles/entities/user_role.entity';
import { IdTypeEntity } from '../id_types/entities/id_type.entity';
import { Module } from '@nestjs/common';
import { AuthorizedFamiliarService } from './services/authorized_familiar.service';
import { AuthorizedFamiliarController } from './controllers/authorized_familiar.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthenticationMethod } from '../authentication_method/entities/authentication_method.entity';
import { NodemailerModule } from 'src/nodemailer/nodemailer.module';
import { AuditLogsModule } from 'src/audit_logs/audit_logs.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AuthorizedFamiliar,
      User,
      UserRole,
      IdTypeEntity,
      AuthenticationMethod,
    ]),
    NodemailerModule,
    AuditLogsModule,
  ],
  controllers: [AuthorizedFamiliarController],
  providers: [AuthorizedFamiliarService],
  exports: [AuthorizedFamiliarService],
})
export class AuthorizedFamiliarModule {}
