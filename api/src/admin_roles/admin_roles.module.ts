import { Module } from '@nestjs/common';
import { AdminRolesService } from './services/admin_roles.service';
import { AdminRolesController } from './controllers/admin_roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminRole } from './entities/admin_role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AdminRole])],
  controllers: [AdminRolesController],
  providers: [AdminRolesService],
})
export class AdminRolesModule {}
