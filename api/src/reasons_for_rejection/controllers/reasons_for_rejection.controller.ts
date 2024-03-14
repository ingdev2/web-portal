import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ReasonsForRejectionService } from '../services/reasons_for_rejection.service';
import { CreateReasonsForRejectionDto } from '../dto/create-reasons_for_rejection.dto';
import { UpdateReasonsForRejectionDto } from '../dto/update-reasons_for_rejection.dto';
import { AdminRolType } from '../../common/enums/admin_roles.enum';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth } from '../../auth/decorators/auth.decorator';

@ApiTags('reasons-for-rejection')
@ApiBearerAuth()
@Auth(AdminRolType.SUPER_ADMIN, AdminRolType.ADMIN)
@Controller('reasons-for-rejection')
export class ReasonsForRejectionController {
  constructor(
    private readonly reasonsForRejectionService: ReasonsForRejectionService,
  ) {}

  // POST METHODS //

  @Post('/create')
  createReasonForRejection(
    @Body() createReasonForRejection: CreateReasonsForRejectionDto,
  ) {
    return this.reasonsForRejectionService.createReasonForRejection(
      createReasonForRejection,
    );
  }

  // GET METHODS //

  @Get('/getAll')
  getAllReasonsForRejection() {
    return this.reasonsForRejectionService.getAllReasonsForRejection();
  }

  // PATCH METHODS //

  @Patch('/update/:id')
  updateReasonForRejection(
    @Param('id') id: number,
    @Body() updateReasonForRejection: UpdateReasonsForRejectionDto,
  ) {
    return this.reasonsForRejectionService.updateReasonForRejection(
      id,
      updateReasonForRejection,
    );
  }
}
