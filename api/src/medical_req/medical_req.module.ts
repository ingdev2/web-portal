import { Module } from '@nestjs/common';
import { MedicalReqService } from './services/medical_req.service';
import { MedicalReqController } from './controllers/medical_req.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicalReq } from './entities/medical_req.entity';
import { User } from '../users/entities/user.entity';
import { NodemailerModule } from '../nodemailer/nodemailer.module';
import { UserRole } from '../user_roles/entities/user_role.entity';
import { IdTypeEntity } from '../id_types/entities/id_type.entity';
import { RequirementTypeModule } from '../requirement_type/requirement_type.module';
import { RequirementType } from '../requirement_type/entities/requirement_type.entity';
import { PatientClassStatus } from '../patient_class_status/entities/patient_class_status.entity';
import { RelWithPatient } from '../rel_with_patient/entities/rel_with_patient.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MedicalReq,
      User,
      UserRole,
      IdTypeEntity,
      RequirementType,
      PatientClassStatus,
      RelWithPatient,
    ]),
    NodemailerModule,
    RequirementTypeModule,
  ],
  providers: [MedicalReqService],
  controllers: [MedicalReqController],
})
export class MedicalReqModule {}
