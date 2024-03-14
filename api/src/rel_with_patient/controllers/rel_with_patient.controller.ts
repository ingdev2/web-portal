import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RelWithPatientService } from '../services/rel_with_patient.service';
import { CreateRelWithPatientDto } from '../dto/create-rel_with_patient.dto';
import { UpdateRelWithPatientDto } from '../dto/update-rel_with_patient.dto';
import { AdminRolType } from '../../common/enums/admin_roles.enum';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth } from '../../auth/decorators/auth.decorator';

@ApiTags('rel-with-patient')
@ApiBearerAuth()
@Auth(AdminRolType.SUPER_ADMIN)
@Controller('rel-with-patient')
export class RelWithPatientController {
  constructor(private readonly relWithPatientService: RelWithPatientService) {}

  // POST METHODS //

  @Post('/create')
  createRelWithPatient(@Body() createRelWithPatient: CreateRelWithPatientDto) {
    return this.relWithPatientService.createRelWithPatient(
      createRelWithPatient,
    );
  }

  // GET METHODS //

  @Get('/getAll')
  getAllRelWithPatient() {
    return this.relWithPatientService.getAllRelWithPatient();
  }

  @Get('/getReqType/:id')
  getRelWithPatientById(id: number) {
    return this.relWithPatientService.getRelWithPatientById(id);
  }

  // PATCH METHODS //

  @Patch('/update/:id')
  updateRelWithPatient(
    @Param('id') id: number,
    @Body() updateRelWithPatient: UpdateRelWithPatientDto,
  ) {
    return this.relWithPatientService.updateRelWithPatient(
      id,
      updateRelWithPatient,
    );
  }
}
