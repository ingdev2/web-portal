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
import { AdminRolType } from 'shared/utils/enums/admin_roles.enum';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth } from '../../auth/decorators/auth.decorator';

@ApiTags('rel-with-patient')
@ApiBearerAuth()
@Controller('rel-with-patient')
export class RelWithPatientController {
  constructor(private readonly relWithPatientService: RelWithPatientService) {}

  // POST METHODS //

  @Auth(AdminRolType.SUPER_ADMIN)
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

  @Get('/getRelationshipType/:id')
  getRelWithPatientById(@Param('id') id: number) {
    return this.relWithPatientService.getRelWithPatientById(id);
  }

  // PATCH METHODS //

  @Auth(AdminRolType.SUPER_ADMIN)
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
