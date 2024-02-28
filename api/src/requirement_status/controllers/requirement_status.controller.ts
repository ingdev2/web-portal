import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RequirementStatusService } from '../services/requirement_status.service';
import { CreateRequirementStatusDto } from '../dto/create-requirement_status.dto';
import { UpdateRequirementStatusDto } from '../dto/update-requirement_status.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth } from '../../auth/decorators/auth.decorator';
import { AdminRolType } from '../../common/enums/admin_roles.enum';

@ApiTags('requirement-status')
@ApiBearerAuth()
@Auth(AdminRolType.SUPER_ADMIN)
@Controller('requirement-status')
export class RequirementStatusController {
  constructor(
    private readonly requirementStatusService: RequirementStatusService,
  ) {}

  // POST METHODS //

  @Post('/create')
  createRequirementStatus(
    @Body() createRequirementStatus: CreateRequirementStatusDto,
  ) {
    return this.requirementStatusService.createRequirementStatus(
      createRequirementStatus,
    );
  }

  // GET METHODS //

  @Get('/getAll')
  getAllRequirementStatus() {
    return this.requirementStatusService.getAllRequirementStatus();
  }

  @Get('/getReqType/:id')
  getRequirementStatusById(id: number) {
    return this.requirementStatusService.getRequirementStatusById(id);
  }

  // PATCH METHODS //

  @Patch('/update/:id')
  updateRequirementStatus(
    @Param('id') id: number,
    @Body() updateRequirementStatus: UpdateRequirementStatusDto,
  ) {
    return this.requirementStatusService.updateRequirementStatus(
      id,
      updateRequirementStatus,
    );
  }
}
