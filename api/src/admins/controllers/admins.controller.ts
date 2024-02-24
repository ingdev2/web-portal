import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { AdminsService } from '../services/admins.service';
import { UpdateAdminDto } from '../dto/update_admin.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { AdminRolType } from 'src/common/enums/admin_roles.enum';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('admins')
@ApiBearerAuth()
@Auth(AdminRolType.SUPER_ADMIN)
@Controller('admins')
export class AdminsController {
  constructor(private adminsService: AdminsService) {}

  // GET METHODS //

  @Get('/getAllAdmins')
  async getAllAdmins() {
    return this.adminsService.getAllAdmins();
  }

  @Get('/getAdmin/:id')
  async getAdminById(@Param('id') id: number) {
    return await this.adminsService.getAdminById(id);
  }

  @Get('/getAdminById/:id')
  async getAdminByIdNumber(@Param('id') idNumber: number) {
    return await this.adminsService.getAdminByIdNumber(idNumber);
  }

  // PATCH METHODS //

  @Auth(AdminRolType.ADMIN)
  @Patch('/updateAdmin/:id')
  async updateAdmin(
    @Param('id')
    id: number,
    @Body() admin: UpdateAdminDto,
  ) {
    return await this.adminsService.updateAdmin(id, admin);
  }

  @Patch('/banAdmin/:id')
  async banUsers(@Param('id') id: number) {
    return await this.adminsService.banAdmins(id);
  }
}
