import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AdminRolType } from 'src/common/enums/admin_roles.enum';
import { UserRolType } from 'src/common/enums/user_roles.enum';
import { AuthorizedFamiliarService } from '../services/authorized_familiar.service';
import { UpdateAuthorizedFamiliarDto } from '../dto/update-authorized_familiar.dto';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';

@ApiTags('authorized-familiar')
@ApiBearerAuth()
@Auth(AdminRolType.SUPER_ADMIN, AdminRolType.ADMIN)
@Controller('authorized-familiar')
export class AuthorizedFamiliarController {
  constructor(
    private readonly authorizedFamiliarService: AuthorizedFamiliarService,
  ) {}

  // GET METHODS //

  @Get('/getAllRelatives')
  async getAllRelatives() {
    return await this.authorizedFamiliarService.getAllRelatives();
  }

  @Get('/getFamiliar/:id')
  async getFamiliarById(@Param('id') id: string) {
    return await this.authorizedFamiliarService.getFamiliarById(id);
  }

  @Get('/getFamiliarById/:idNumber')
  async getFamiliarByIdNumber(@Param('idNumber') idNumber: number) {
    return await this.authorizedFamiliarService.getFamiliarByIdNumber(idNumber);
  }

  // PATCH METHODS //

  @Auth(UserRolType.PATIENT)
  @Patch('/updateFamiliar/:id')
  async updateUserFamiliar(
    @Param('id') id: string,
    @Body() familar: UpdateAuthorizedFamiliarDto,
  ) {
    return await this.authorizedFamiliarService.updateUserFamiliar(id, familar);
  }

  @Auth(UserRolType.PATIENT)
  @Patch('/ban/:id')
  async banRelatives(@Param('id') id: string) {
    return await this.authorizedFamiliarService.banRelatives(id);
  }
}
