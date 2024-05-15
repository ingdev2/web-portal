import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RequirementTypeService } from '../services/requirement_type.service';
import { CreateRequirementTypeDto } from '../dto/create-requirement_type.dto';
import { UpdateRequirementTypeDto } from '../dto/update-requirement_type.dto';
import { AdminRolType } from '../../utils/enums/admin_roles.enum';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth } from '../../auth/decorators/auth.decorator';

@ApiTags('requirement-type')
@ApiBearerAuth()
@Controller('requirement-type')
export class RequirementTypeController {
  constructor(
    private readonly requirementTypeService: RequirementTypeService,
  ) {}

  // POST METHODS //

  @Auth(AdminRolType.SUPER_ADMIN, AdminRolType.ADMIN)
  @Post('/create')
  createRequirementType(
    @Body() createRequirementType: CreateRequirementTypeDto,
  ) {
    return this.requirementTypeService.createRequirementType(
      createRequirementType,
    );
  }

  // GET METHODS //

  @Get('/getAll')
  getAllRequirementType() {
    return this.requirementTypeService.getAllRequirementType();
  }

  @Get('/getReqType/:id')
  getRequirementTypeById(id: number) {
    return this.requirementTypeService.getRequirementTypeById(id);
  }

  // PATCH METHODS //

  @Auth(AdminRolType.SUPER_ADMIN, AdminRolType.ADMIN)
  @Patch('/update/:id')
  updateRequirementType(
    @Param('id') id: number,
    @Body() updateRequirementType: UpdateRequirementTypeDto,
  ) {
    return this.requirementTypeService.updateRequirementType(
      id,
      updateRequirementType,
    );
  }
}
