import { Module } from '@nestjs/common';
import { PatientClassStatusService } from './services/patient_class_status.service';
import { PatientClassStatusController } from './controllers/patient_class_status.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientClassStatus } from './entities/patient_class_status.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PatientClassStatus])],
  controllers: [PatientClassStatusController],
  providers: [PatientClassStatusService],
})
export class PatientClassStatusModule {}
