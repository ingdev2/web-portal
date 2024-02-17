import { Body, Param, Controller, Post } from '@nestjs/common';
import { MedicalReqService } from '../services/medical_req.service';
import { CreateMedicalReqDto } from '../dto/create_medical_req.dto';

@Controller('medical-req')
export class MedicalReqController {
  constructor(private medicalReqService: MedicalReqService) {}

  @Post('/createMedicalReq/:userId')
  async createMedicalReqPerson(
    @Param('userId') userId: string,
    @Body()
    medicalReq: CreateMedicalReqDto,
  ) {
    return await this.medicalReqService.createMedicalReqPerson(
      userId,
      medicalReq,
    );
  }
}
