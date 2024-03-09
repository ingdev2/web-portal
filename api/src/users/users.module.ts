import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserRole } from '../user_roles/entities/user_role.entity';
import { UserRolesModule } from '../user_roles/user_roles.module';
import { IdTypesModule } from 'src/id_types/id_types.module';
import { IdTypeEntity } from 'src/id_types/entities/id_type.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserRole, IdTypeEntity]),
    UserRolesModule,
    IdTypesModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
