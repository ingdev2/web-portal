import { User } from './entities/user.entity';
import { UserRole } from '../user_roles/entities/user_role.entity';
import { UserRolesModule } from '../user_roles/user_roles.module';
import { EpsCompany } from 'src/eps_company/entities/eps_company.entity';
import { AuthorizedFamiliar } from '../authorized_familiar/entities/authorized_familiar.entity';
import { AuthorizedFamiliarModule } from '../authorized_familiar/authorized_familiar.module';
import { AuthenticationMethod } from '../authentication_method/entities/authentication_method.entity';
import { IdTypesModule } from '../id_types/id_types.module';
import { IdTypeEntity } from '../id_types/entities/id_type.entity';
import { GenderType } from '../genders/entities/gender.entity';
import { NodemailerModule } from 'src/nodemailer/nodemailer.module';
import { DeptsAndCitiesModule } from '../depts_and_cities/depts_and_cities.module';
import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      EpsCompany,
      UserRole,
      IdTypeEntity,
      GenderType,
      AuthenticationMethod,
      AuthorizedFamiliar,
    ]),
    UserRolesModule,
    IdTypesModule,
    AuthorizedFamiliarModule,
    NodemailerModule,
    DeptsAndCitiesModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
