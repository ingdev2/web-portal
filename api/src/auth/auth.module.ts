import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';
import { AdminsModule } from '../admins/admins.module';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants/jwt.constants';
import { UserRolesModule } from '../user_roles/user_roles.module';
import { AdminRolesModule } from '../admin_roles/admin_roles.module';
import { NodemailerModule } from 'src/nodemailer/nodemailer.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    AdminsModule,
    UsersModule,
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
