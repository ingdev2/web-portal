import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserRole } from 'src/user_roles/entities/user_role.entity';
import { UserRolesModule } from 'src/user_roles/user_roles.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserRole]), UserRolesModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
