import { Module } from '@nestjs/common';
import { UserRolesService } from './services/user_roles.service';
import { UserRolesController } from './controllers/user_roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRole } from './entities/user_role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserRole])],
  controllers: [UserRolesController],
  providers: [UserRolesService],
})
export class UserRolesModule {}
