import { Body, Param, Controller, Post } from '@nestjs/common';
import { MedicalReqService } from '../services/medical_req.service';
import { CreateMedicalReqPersonDto } from '../dto/create_medical_req_person.dto';
import { CreateMedicalReqEpsDto } from '../dto/create_medical_req_eps.dto';

@Controller('medical-req')
export class MedicalReqController {
  constructor(private medicalReqService: MedicalReqService) {}

  @Post('/createMedicalReqPerson/:userId')
  async createMedicalReqPerson(
    @Param('userId') userId: string,
    @Body()
    medicalReqPerson: CreateMedicalReqPersonDto,
  ) {
    return await this.medicalReqService.createMedicalReqPerson(
      userId,
      medicalReqPerson,
    );
  }

  @Post('/createMedicalReqEps/:userId')
  async createMedicalReqEps(
    @Param('userId') userId: string,
    @Body()
    medicalReqEps: CreateMedicalReqEpsDto,
  ) {
    return await this.medicalReqService.createMedicalReqEps(
      userId,
      medicalReqEps,
    );
  }
}