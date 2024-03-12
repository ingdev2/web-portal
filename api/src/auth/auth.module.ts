import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';
import { AdminsModule } from '../admins/admins.module';
import { UsersModule } from '../users/users.module';
import { AuthorizedFamiliarModule } from '../authorized_familiar/authorized_familiar.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants/jwt.constants';
import { Admin } from '../admins/entities/admin.entity';
import { User } from '../users/entities/user.entity';
import { UserRolesModule } from '../user_roles/user_roles.module';
import { AdminRolesModule } from '../admin_roles/admin_roles.module';
import { NodemailerModule } from '../nodemailer/nodemailer.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Admin]),
    AdminsModule,
    UsersModule,
    AuthorizedFamiliarModule,
    UserRolesModule,
    AdminRolesModule,
    NodemailerModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '20m' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
