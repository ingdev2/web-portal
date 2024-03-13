import { AuthorizedFamiliar } from './entities/authorized_familiar.entity';
import { User } from '../users/entities/user.entity';
import { UserRole } from '../user_roles/entities/user_role.entity';
import { UserRolesModule } from '../user_roles/user_roles.module';
import { IdTypeEntity } from '../id_types/entities/id_type.entity';
import { IdTypesModule } from '../id_types/id_types.module';
import { Module } from '@nestjs/common';
import { AuthorizedFamiliarService } from './services/authorized_familiar.service';
import { AuthorizedFamiliarController } from './controllers/authorized_familiar.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AuthorizedFamiliar,
      User,
      UserRole,
      IdTypeEntity,
    ]),
    UserRolesModule,
    IdTypesModule,
  ],
  controllers: [AuthorizedFamiliarController],
  providers: [AuthorizedFamiliarService],
  exports: [AuthorizedFamiliarService],
})
export class AuthorizedFamiliarModule {}
