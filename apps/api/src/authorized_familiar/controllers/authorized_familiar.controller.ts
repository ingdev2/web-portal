import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Query,
} from '@nestjs/common';
import { AdminRolType } from 'shared/utils/enums/admin_roles.enum';
import { UserRolType } from 'shared/utils/enums/user_roles.enum';
import { AuthorizedFamiliarService } from '../services/authorized_familiar.service';
import { UpdateAuthorizedFamiliarDto } from '../dto/update-authorized_familiar.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth } from '../../auth/decorators/auth.decorator';
import { EnableAuditLog } from 'src/audit_logs/decorators/enable-audit-log.decorator';

@ApiTags('authorized-familiar')
@ApiBearerAuth()
@Controller('authorized-familiar')
export class AuthorizedFamiliarController {
  constructor(
    private readonly authorizedFamiliarService: AuthorizedFamiliarService,
  ) {}

  // GET METHODS //

  @Auth(AdminRolType.SUPER_ADMIN, AdminRolType.ADMIN, UserRolType.PATIENT)
  @Get('/getAllRelatives')
  async getAllRelatives() {
    return await this.authorizedFamiliarService.getAllRelatives();
  }

  @Get('/getFamiliar/:id')
  async getFamiliarById(@Param('id') id: string) {
    return await this.authorizedFamiliarService.getFamiliarById(id);
  }

  @Get('/getFamiliarById/:idNumber')
  async getFamiliarByIdNumber(
    @Param('idNumber') idNumber: number,
    @Query('patientIdNumber') patientIdNumber?: number,
  ) {
    return await this.authorizedFamiliarService.getFamiliarCompleteByIdNumber(
      idNumber,
      patientIdNumber,
    );
  }

  // PATCH METHODS //

  @Auth(
    AdminRolType.SUPER_ADMIN,
    AdminRolType.ADMIN,
    UserRolType.AUTHORIZED_FAMILIAR,
  )
  @Patch('/updateFamiliar/:id')
  async updateUserFamiliar(
    @Param('id') id: string,
    @Body() familar: UpdateAuthorizedFamiliarDto,
  ) {
    return await this.authorizedFamiliarService.updateUserFamiliar(id, familar);
  }

  @EnableAuditLog()
  @Auth(AdminRolType.SUPER_ADMIN, AdminRolType.ADMIN, UserRolType.PATIENT)
  @Patch('/ban/:id')
  async banRelatives(@Param('id') id: string, @Req() requestAuditLog: any) {
    return await this.authorizedFamiliarService.banRelatives(
      id,
      requestAuditLog,
    );
  }
}
