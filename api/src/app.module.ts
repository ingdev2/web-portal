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
import { AuthorizedFamiliarModule } from './authorized_familiar/authorized_familiar.module';
import { GenderTypeModule } from './genders/genders.module';
import { IdTypesModule } from './id_types/id_types.module';
import { CompanyAreaModule } from './company_area/company_area.module';
import { RequirementTypeModule } from './requirement_type/requirement_type.module';
import { PatientClassStatusModule } from './patient_class_status/patient_class_status.module';
import { RelWithPatientModule } from './rel_with_patient/rel_with_patient.module';
import { RequirementStatusModule } from './requirement_status/requirement_status.module';
import { EpsCompanyModule } from './eps_company/eps_company.module';
import { DeptsAndCitiesModule } from './depts_and_cities/depts_and_cities.module';
import { ReasonsForRejectionModule } from './reasons_for_rejection/reasons_for_rejection.module';
import { PositionLevelModule } from './position_level/position_level.module';
import { AuthenticationMethodModule } from './authentication_method/authentication_method.module';
import { S3FileUploaderModule } from './s3_file_uploader/s3_file_uploader.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.TYPEORM_HOST_PRO,
      port: +process.env.TYPEORM_PORT_PRO,
      username: process.env.TYPEORM_USERNAME_PRO,
      password: process.env.TYPEORM_PASSWORD_PRO,
      database: process.env.TYPEORM_DATABASE_PRO,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      // synchronize: true,
      // autoLoadEntities: true,
      // logging: false,
    }),
    UsersModule,
    AdminsModule,
    AuthorizedFamiliarModule,
    MedicalReqModule,
    AuthModule,
    NodemailerModule,
    UserRolesModule,
    AdminRolesModule,
    GenderTypeModule,
    IdTypesModule,
    CompanyAreaModule,
    RequirementTypeModule,
    PatientClassStatusModule,
    RelWithPatientModule,
    RequirementStatusModule,
    EpsCompanyModule,
    DeptsAndCitiesModule,
    ReasonsForRejectionModule,
    PositionLevelModule,
    AuthenticationMethodModule,
    S3FileUploaderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
