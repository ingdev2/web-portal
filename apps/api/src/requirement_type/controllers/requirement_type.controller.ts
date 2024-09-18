import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { RequirementTypeService } from '../services/requirement_type.service';
import { CreateRequirementTypeDto } from '../dto/create-requirement_type.dto';
import { UpdateRequirementTypeDto } from '../dto/update-requirement_type.dto';
import { AdminRolType } from 'shared/utils/enums/admin_roles.enum';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth } from '../../auth/decorators/auth.decorator';
import { EnableAuditLog } from 'src/audit_logs/decorators/enable-audit-log.decorator';

@ApiTags('requirement-type')
@ApiBearerAuth()
@Controller('requirement-type')
export class RequirementTypeController {
  constructor(
    private readonly requirementTypeService: RequirementTypeService,
  ) {}

  // POST METHODS //

  @EnableAuditLog()
  @Auth(AdminRolType.SUPER_ADMIN, AdminRolType.ADMIN)
  @Post('/create')
  createRequirementType(
    @Body() createRequirementType: CreateRequirementTypeDto,
    @Req() requestAuditLog: any,
  ) {
    return this.requirementTypeService.createRequirementType(
      createRequirementType,
      requestAuditLog,
    );
  }

  // GET METHODS //

  @Get('/getAll')
  getAllRequirementType() {
    return this.requirementTypeService.getAllRequirementType();
  }

  @Auth(AdminRolType.SUPER_ADMIN, AdminRolType.ADMIN)
  @Get('/getAllAdminDashboard')
  getAllRequirementTypeAdminDashboard() {
    return this.requirementTypeService.getAllRequirementTypeAdminDashboard();
  }

  @Get('/getReqType/:id')
  getRequirementTypeById(id: number) {
    return this.requirementTypeService.getRequirementTypeById(id);
  }

  // PATCH METHODS //

  @EnableAuditLog()
  @Auth(AdminRolType.SUPER_ADMIN, AdminRolType.ADMIN)
  @Patch('/update/:id')
  updateRequirementType(
    @Param('id') id: number,
    @Body() updateRequirementType: UpdateRequirementTypeDto,
    @Req() requestAuditLog: any,
  ) {
    return this.requirementTypeService.updateRequirementType(
      id,
      updateRequirementType,
      requestAuditLog,
    );
  }

  @EnableAuditLog()
  @Auth(AdminRolType.SUPER_ADMIN, AdminRolType.ADMIN)
  @Patch('/ban/:id')
  async banRequirementeType(
    @Param('id') id: number,
    @Req() requestAuditLog: any,
  ) {
    return await this.requirementTypeService.banRequirementeType(
      id,
      requestAuditLog,
    );
  }
}
