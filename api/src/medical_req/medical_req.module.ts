import { Module } from '@nestjs/common';
import { MedicalReqService } from './services/medical_req.service';
import { MedicalReqController } from './controllers/medical_req.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicalReq } from './entities/medical_req.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MedicalReq])],
  providers: [MedicalReqService],
  controllers: [MedicalReqController],
})
export class MedicalReqModule {}
