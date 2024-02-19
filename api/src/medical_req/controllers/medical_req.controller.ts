import {
  Body,
  Param,
  Controller,
  Post,
  Get,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { MedicalReqService } from '../services/medical_req.service';
import { CreateMedicalReqPersonDto } from '../dto/create_medical_req_person.dto';
import { CreateMedicalReqEpsDto } from '../dto/create_medical_req_eps.dto';
import { UpdateStatusMedicalReqDto } from '../dto/update_status_medical_req.dto';

@Controller('medical-req')
export class MedicalReqController {
  constructor(private medicalReqService: MedicalReqService) {}

  // POST METHODS //

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

  // GET METHODS //

  @Get('/getAllMedicalReqPerson')
  async getAllMedicalReqPerson() {
    return await this.medicalReqService.getAllMedicalReqPerson();
  }

  @Get('/getAllMedicalReqEps')
  async getAllMedicalReqEps() {
    return await this.medicalReqService.getAllMedicalReqEps();
  }

  @Get('/medicalReqPerson/:id')
  async getMedicalReqPersonById(@Param('id') id: string) {
    return await this.medicalReqService.getMedicalReqPersonById(id);
  }

  @Get('/medicalReqEps/:id')
  async getMedicalReqEpsById(@Param('id') id: string) {
    return await this.medicalReqService.getMedicalReqEpsById(id);
  }

  @Get('/medicalReq/:filing_number')
  async getMedicalReqByFilingNumber(
    @Param('filing_number') filingNumber: string,
  ) {
    return await this.medicalReqService.getMedicalReqByFilingNumber(
      filingNumber,
    );
  }

  // PATCH METHODS //

  @Patch('/updateStatus/:id')
  async updateStatus(
    @Param('id') id: string,
    @Body() newStatus: UpdateStatusMedicalReqDto,
  ) {
    return await this.medicalReqService.updateStatus(id, newStatus);
  }

  @Patch('/deleted/:id')
  async deletedMedicalReq(@Param('id') id: string) {
    return await this.medicalReqService.deletedMedicalReq(id);
  }
}
