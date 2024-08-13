import {
  Body,
  Param,
  Controller,
  Post,
  Get,
  Patch,
  Query,
} from '@nestjs/common';
import { MedicalReqService } from '../services/medical_req.service';
import { CreateMedicalReqFamiliarDto } from '../dto/create_medical_req_familiar.dto';
import { CreateMedicalReqPatientDto } from '../dto/create_medical_req_patient.dto';
import { CreateMedicalReqEpsDto } from '../dto/create_medical_req_eps.dto';
import { UpdateStatusMedicalReqDto } from '../dto/update_status_medical_req.dto';
import { AdminRolType } from '../../utils/enums/admin_roles.enum';
import { UserRolType } from '../../utils/enums/user_roles.enum';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth } from '../../auth/decorators/auth.decorator';
import { RequirementStatusEnum } from '../enums/requirement_status.enum';
import { RequirementTypeEnum } from '../enums/requirement_type.enum';

@ApiTags('medical-req')
@ApiBearerAuth()
@Auth(AdminRolType.SUPER_ADMIN)
@Controller('medical-req')
export class MedicalReqController {
  constructor(private medicalReqService: MedicalReqService) {}

  // POST METHODS //

  @Auth(UserRolType.PATIENT)
  @Post('/createMedicalReqPatient/:userId')
  async createMedicalReqPatient(
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
  @Post('/createMedicalReqFamiliar/:familiarId')
  async createMedicalReqFamiliar(
    @Param('familiarId') familiarId: string,
    @Body()
    medicalReqFamiliar: CreateMedicalReqFamiliarDto,
  ) {
    return await this.medicalReqService.createMedicalReqFamiliar(
      familiarId,
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
  @Get('/getAllMedicalReqUsersToLegalArea')
  async getAllMedReqUsersToLegalArea() {
    return await this.medicalReqService.getAllMedReqUsersToLegalArea();
  }

  @Auth(AdminRolType.ADMIN)
  @Get('/getAllMedicalReqUsers')
  async getAllMedicalReqUsers(
    @Query('status') status?: RequirementStatusEnum,
    @Query('type') type?: RequirementTypeEnum,
  ) {
    return await this.medicalReqService.getAllMedicalReqUsers(status, type);
  }

  @Auth(UserRolType.PATIENT, UserRolType.EPS)
  @Get('/getAllMedicalReqOfAUsers/:userId')
  async getAllMedicalReqOfAUsers(@Param('userId') userId: string) {
    return await this.medicalReqService.getAllMedicalReqOfAUsers(userId);
  }

  @Auth(UserRolType.AUTHORIZED_FAMILIAR)
  @Get('/getAllMedicalReqOfAFamiliar/:userId')
  async getAllMedicalReqOfAFamiliar(@Param('userId') familiarId: string) {
    return await this.medicalReqService.getAllMedicalReqOfAFamiliar(familiarId);
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

  @Auth(AdminRolType.ADMIN)
  @Get('/medicalReqById/:id')
  async getMedicalReqById(@Param('id') id: string) {
    return await this.medicalReqService.getMedicalReqById(id);
  }

  @Auth(AdminRolType.ADMIN)
  @Get('/medicalReqPatient/:id')
  async getMedicalReqPatientById(@Param('id') id: string) {
    return await this.medicalReqService.getMedicalReqPatientById(id);
  }

  @Auth(AdminRolType.ADMIN)
  @Get('/medicalReqFamiliar/:id')
  async getMedicalReqFamiliarById(@Param('id') id: string) {
    return await this.medicalReqService.getMedicalReqFamiliarById(id);
  }

  @Auth(AdminRolType.ADMIN)
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
  @Patch('/visualizedStatus/:reqId')
  async changeStatusToVisualized(@Param('reqId') reqId: string) {
    return await this.medicalReqService.changeStatusToVisualized(reqId);
  }

  @Auth(AdminRolType.ADMIN)
  @Patch('/underReviewStatus/:reqId')
  async changeStatusToUnderReview(@Param('reqId') reqId: string) {
    return await this.medicalReqService.changeStatusToUnderReview(reqId);
  }

  @Auth(AdminRolType.ADMIN)
  @Patch('/deliveredStatus/:reqId')
  async changeStatusToDelivered(
    @Param('reqId') reqId: string,
    @Body() deliveredStatus: UpdateStatusMedicalReqDto,
  ) {
    return await this.medicalReqService.changeStatusToDelivered(
      reqId,
      deliveredStatus,
    );
  }

  @Auth(AdminRolType.ADMIN)
  @Patch('/rejectedStatus/:reqId')
  async changeStatusToRejected(
    @Param('reqId') reqId: string,
    @Body() rejectedStatus: UpdateStatusMedicalReqDto,
  ) {
    return await this.medicalReqService.changeStatusToRejected(
      reqId,
      rejectedStatus,
    );
  }

  @Auth(AdminRolType.ADMIN)
  @Patch('/sendToAnotherArea/:reqId')
  async forwardToAnotherArea(
    @Param('reqId') reqId: string,
    @Body() sendToLegalArea: UpdateStatusMedicalReqDto,
  ) {
    return await this.medicalReqService.sendToAnotherArea(
      reqId,
      sendToLegalArea,
    );
  }

  @Auth(
    AdminRolType.ADMIN,
    UserRolType.PATIENT,
    UserRolType.EPS,
    UserRolType.AUTHORIZED_FAMILIAR,
  )
  @Patch('/deleted/:reqId')
  async deletedMedicalReq(@Param('reqId') reqId: string) {
    return await this.medicalReqService.deletedMedicalReq(reqId);
  }
}
