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

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MedicalReq,
      User,
      UserRole,
      IdTypeEntity,
      RequirementType,
    ]),
    NodemailerModule,
    RequirementTypeModule,
  ],
  providers: [MedicalReqService],
  controllers: [MedicalReqController],
})
export class MedicalReqModule {}
