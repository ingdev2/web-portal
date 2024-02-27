import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

require('dotenv').config();

import { UsersModule } from './users/users.module';
import { AdminsModule } from './admins/admins.module';
import { MedicalReqModule } from './medical_req/medical_req.module';
import { AuthModule } from './auth/auth.module';
import { NodemailerModule } from './nodemailer/nodemailer.module';
import { UserRolesModule } from './user_roles/user_roles.module';
import { AdminRolesModule } from './admin_roles/admin_roles.module';
import { GenderTypeModule } from './genders/genders.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.TYPEORM_HOST,
      port: +process.env.TYPEORM_PORT,
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      autoLoadEntities: true,
    }),
    UsersModule,
    AdminsModule,
    MedicalReqModule,
    AuthModule,
    NodemailerModule,
    UserRolesModule,
    AdminRolesModule,
    GenderTypeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
