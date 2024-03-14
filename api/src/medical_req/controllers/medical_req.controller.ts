import { Body, Param, Controller, Post, Get, Patch } from '@nestjs/common';
import { MedicalReqService } from '../services/medical_req.service';
import { CreateMedicalReqFamiliarDto } from '../dto/create_medical_req_familiar.dto';
import { CreateMedicalReqPatientDto } from '../dto/create_medical_req_patient.dto';
import { CreateMedicalReqEpsDto } from '../dto/create_medical_req_eps.dto';
import { UpdateStatusMedicalReqDto } from '../dto/update_status_medical_req.dto';
import { AdminRolType } from '../../common/enums/admin_roles.enum';
import { UserRolType } from '../../common/enums/user_roles.enum';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth } from '../../auth/decorators/auth.decorator';

@ApiTags('medical-req')
@ApiBearerAuth()
@Auth(AdminRolType.SUPER_ADMIN)
@Controller('medical-req')
export class MedicalReqController {
  constructor(private medicalReqService: MedicalReqService) {}

  // POST METHODS //

  @Auth(UserRolType.PATIENT)
  @Post('/createMedicalReqPatient/:userId')
  async createMedicalReqPerson(
    @Param('userId') userId: string,
    @Body()
    medicalReqPatient: CreateMedicalReqPatientDto,
  ) {
    return await this.medicalReqService.createMedicalReqPatient(
      userId,
      medicalReqPatient,
    );
  }

  @Auth(UserRolType.AUTHORIZED_FAMILIAR)
  @Post('/createMedicalReqFamiliar/:userId')
  async createMedicalReqFamiliar(
    @Param('userId') userId: string,
    @Body()
    medicalReqFamiliar: CreateMedicalReqFamiliarDto,
  ) {
    return await this.medicalReqService.createMedicalReqFamiliar(
      userId,
      medicalReqFamiliar,
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
  @Get('/getAllMedicalReqPatient')
  async getAllMedicalReqPatient() {
    return await this.medicalReqService.getAllMedicalReqPatient();
  }

  @Auth(AdminRolType.ADMIN)
  @Get('/getAllMedicalReqFamiliar')
  async getAllMedicalReqFamiliar() {
    return await this.medicalReqService.getAllMedicalReqFamiliar();
  }

  @Auth(AdminRolType.ADMIN)
  @Get('/getAllMedicalReqEps')
  async getAllMedicalReqEps() {
    return await this.medicalReqService.getAllMedicalReqEps();
  }

  @Auth(
    AdminRolType.ADMIN,
    UserRolType.PATIENT,
    UserRolType.AUTHORIZED_FAMILIAR,
  )
  @Get('/medicalReqPatient/:id')
  async getMedicalReqPatientById(@Param('id') id: string) {
    return await this.medicalReqService.getMedicalReqPatientById(id);
  }

  @Auth(
    AdminRolType.ADMIN,
    UserRolType.PATIENT,
    UserRolType.AUTHORIZED_FAMILIAR,
  )
  @Get('/medicalReqFamiliar/:id')
  async getMedicalReqFamiliarById(@Param('id') id: string) {
    return await this.medicalReqService.getMedicalReqFamiliarById(id);
  }

  @Auth(AdminRolType.ADMIN, UserRolType.EPS)
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
