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
import { AdminRolType } from '../../utils/enums/admin_roles.enum';
import { UserRolType } from 'src/utils/enums/user_roles.enum';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth } from '../../auth/decorators/auth.decorator';

@ApiTags('requirement-status')
@ApiBearerAuth()
@Controller('requirement-status')
export class RequirementStatusController {
  constructor(
    private readonly requirementStatusService: RequirementStatusService,
  ) {}

  // POST METHODS //

  @Auth(AdminRolType.SUPER_ADMIN, AdminRolType.ADMIN)
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

  @Get('/getReqStatus/:id')
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
