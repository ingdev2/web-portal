import { Module } from '@nestjs/common';
import { RelWithPatientService } from './services/rel_with_patient.service';
import { RelWithPatientController } from './controllers/rel_with_patient.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RelWithPatient } from './entities/rel_with_patient.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RelWithPatient])],
  controllers: [RelWithPatientController],
  providers: [RelWithPatientService],
})
export class RelWithPatientModule {}
