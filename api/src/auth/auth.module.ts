import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';
import { AdminsModule } from '../admins/admins.module';
import { UsersModule } from '../users/users.module';
import { AuthorizedFamiliarModule } from '../authorized_familiar/authorized_familiar.module';
import { IdTypeEntity } from '../id_types/entities/id_type.entity';
import { JwtModule } from '@nestjs/jwt';
import { Admin } from '../admins/entities/admin.entity';
import { User } from '../users/entities/user.entity';
import { AuthorizedFamiliar } from '../authorized_familiar/entities/authorized_familiar.entity';
import { AuthenticationMethod } from '../authentication_method/entities/authentication_method.entity';
import { AdminRole } from 'src/admin_roles/entities/admin_role.entity';
import { UserRole } from '../user_roles/entities/user_role.entity';
import { AdminRolesModule } from '../admin_roles/admin_roles.module';
import { NodemailerModule } from '../nodemailer/nodemailer.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Admin,
      AuthorizedFamiliar,
      IdTypeEntity,
      UserRole,
      AdminRole,
      AuthenticationMethod,
    ]),
    AdminsModule,
    UsersModule,
    AuthorizedFamiliarModule,
    AdminRolesModule,
    NodemailerModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_CONSTANTS_SECRET,
      signOptions: { expiresIn: process.env.EXPIRES_IN },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
