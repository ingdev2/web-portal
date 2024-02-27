import { Body, Param, Controller, Post, Get, Patch } from '@nestjs/common';
import { MedicalReqService } from '../services/medical_req.service';
import { CreateMedicalReqPersonDto } from '../dto/create_medical_req_person.dto';
import { CreateMedicalReqEpsDto } from '../dto/create_medical_req_eps.dto';
import { UpdateStatusMedicalReqDto } from '../dto/update_status_medical_req.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { AdminRolType } from '../../common/enums/admin_roles.enum';
import { UserRolType } from '../../common/enums/user_roles.enum';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('medical_req')
@ApiBearerAuth()
@Auth(AdminRolType.SUPER_ADMIN)
@Controller('medical-req')
export class MedicalReqController {
  constructor(private medicalReqService: MedicalReqService) {}

  // POST METHODS //

  @Auth(UserRolType.PERSON)
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

  @Auth(UserRolType.EPS)
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

  @Auth(AdminRolType.ADMIN)
  @Get('/getAllMedicalReqUsers')
  async getAllMedicalReqUsers() {
    return await this.medicalReqService.getAllMedicalReqUsers();
  }

  @Auth(AdminRolType.ADMIN)
  @Get('/getAllMedicalReqPerson')
  async getAllMedicalReqPerson() {
    return await this.medicalReqService.getAllMedicalReqPerson();
  }

  @Auth(AdminRolType.ADMIN)
  @Get('/getAllMedicalReqEps')
  async getAllMedicalReqEps() {
    return await this.medicalReqService.getAllMedicalReqEps();
  }

  @Auth(AdminRolType.ADMIN)
  @Auth(UserRolType.PERSON)
  @Get('/medicalReqPerson/:id')
  async getMedicalReqPersonById(@Param('id') id: string) {
    return await this.medicalReqService.getMedicalReqPersonById(id);
  }

  @Auth(AdminRolType.ADMIN)
  @Auth(UserRolType.EPS)
  @Get('/medicalReqEps/:id')
  async getMedicalReqEpsById(@Param('id') id: string) {
    return await this.medicalReqService.getMedicalReqEpsById(id);
  }

  @Auth(AdminRolType.ADMIN)
  @Get('/medicalReq/:filing_number')
  async getMedicalReqByFilingNumber(
    @Param('filing_number') filingNumber: string,
  ) {
    return await this.medicalReqService.getMedicalReqByFilingNumber(
      filingNumber,
    );
  }

  // PATCH METHODS //

  @Auth(AdminRolType.ADMIN)
  @Patch('/updateStatus/:id')
  async updateStatus(
    @Param('id') id: string,
    @Body() newStatus: UpdateStatusMedicalReqDto,
  ) {
    return await this.medicalReqService.updateStatus(id, newStatus);
  }

  @Auth(AdminRolType.ADMIN)
  @Patch('/deleted/:id')
  async deletedMedicalReq(@Param('id') id: string) {
    return await this.medicalReqService.deletedMedicalReq(id);
  }
}
