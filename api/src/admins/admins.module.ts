import { Module } from '@nestjs/common';
import { AdminsService } from './services/admins.service';
import { AdminsController } from './controllers/admins.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { UserRole } from '../user_roles/entities/user_role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Admin, UserRole])],
  controllers: [AdminsController],
  providers: [AdminsService],
  exports: [AdminsService],
})
export class AdminsModule {}
