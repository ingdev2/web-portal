import { Module } from '@nestjs/common';
import { MedicalReqService } from './services/medical_req.service';
import { MedicalReqController } from './controllers/medical_req.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicalReq } from './entities/medical_req.entity';
import { User } from '../users/entities/user.entity';
import { AuthorizedFamiliar } from '../authorized_familiar/entities/authorized_familiar.entity';
import { UsersModule } from '../users/users.module';
import { UserRole } from '../user_roles/entities/user_role.entity';
import { IdTypeEntity } from '../id_types/entities/id_type.entity';
import { RequirementType } from '../requirement_type/entities/requirement_type.entity';
import { RequirementTypeModule } from '../requirement_type/requirement_type.module';
import { RequirementStatus } from '../requirement_status/entities/requirement_status.entity';
import { RequirementStatusModule } from '../requirement_status/requirement_status.module';
import { PatientClassStatus } from '../patient_class_status/entities/patient_class_status.entity';
import { RelWithPatient } from '../rel_with_patient/entities/rel_with_patient.entity';
import { NodemailerModule } from '../nodemailer/nodemailer.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MedicalReq,
      User,
      AuthorizedFamiliar,
      UserRole,
      IdTypeEntity,
      RequirementType,
      PatientClassStatus,
      RelWithPatient,
      RequirementStatus,
    ]),
    UsersModule,
    NodemailerModule,
    RequirementTypeModule,
    RequirementStatusModule,
  ],
  providers: [MedicalReqService],
  controllers: [MedicalReqController],
})
export class MedicalReqModule {}
