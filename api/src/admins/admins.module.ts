import { Module } from '@nestjs/common';
import { AdminsService } from './services/admins.service';
import { AdminsController } from './controllers/admins.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { AdminRole } from 'src/admin_roles/entities/admin_role.entity';
import { AdminRolesModule } from 'src/admin_roles/admin_roles.module';

@Module({
  imports: [TypeOrmModule.forFeature([Admin, AdminRole]), AdminRolesModule],
  controllers: [AdminsController],
  providers: [AdminsService],
  exports: [AdminsService],
})
export class AdminsModule {}
