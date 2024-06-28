import { Module } from '@nestjs/common';
import { AdminsService } from './services/admins.service';
import { AdminsController } from './controllers/admins.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { AdminRole } from '../admin_roles/entities/admin_role.entity';
import { PositionLevel } from '../position_level/entities/position_level.entity';
import { AuthenticationMethod } from 'src/authentication_method/entities/authentication_method.entity';
import { NodemailerModule } from 'src/nodemailer/nodemailer.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Admin,
      AdminRole,
      PositionLevel,
      AuthenticationMethod,
    ]),
    NodemailerModule,
  ],
  controllers: [AdminsController],
  providers: [AdminsService],
  exports: [AdminsService],
})
export class AdminsModule {}
