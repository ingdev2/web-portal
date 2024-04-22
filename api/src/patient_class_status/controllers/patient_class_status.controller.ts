import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PatientClassStatusService } from '../services/patient_class_status.service';
import { CreatePatientClassStatusDto } from '../dto/create-patient_class_status.dto';
import { UpdatePatientClassStatusDto } from '../dto/update-patient_class_status.dto';
import { AdminRolType } from '../../utils/enums/admin_roles.enum';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth } from '../../auth/decorators/auth.decorator';

@ApiTags('patient-class-status')
@ApiBearerAuth()
@Auth(AdminRolType.SUPER_ADMIN)
@Controller('patient-class-status')
export class PatientClassStatusController {
  constructor(
    private readonly patientClassStatusService: PatientClassStatusService,
  ) {}

  // POST METHODS //

  @Post('/create')
  createRequirementType(
    @Body() createPatientClassStatus: CreatePatientClassStatusDto,
  ) {
    return this.patientClassStatusService.createPatientClassStatus(
      createPatientClassStatus,
    );
  }

  // GET METHODS //

  @Get('/getAll')
  getAllPatientClassStatus() {
    return this.patientClassStatusService.getAllPatientClassStatus();
  }

  @Get('/getReqType/:id')
  getPatientClassStatusById(id: number) {
    return this.patientClassStatusService.getPatientClassStatusById(id);
  }

  // PATCH METHODS //

  @Patch('/update/:id')
  updatePatientClassStatus(
    @Param('id') id: number,
    @Body() updatePatientClassStatus: UpdatePatientClassStatusDto,
  ) {
    return this.patientClassStatusService.updatePatientClassStatus(
      id,
      updatePatientClassStatus,
    );
  }
}
