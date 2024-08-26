import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { AdminsService } from '../services/admins.service';
import { UpdateAdminDto } from '../dto/update_admin.dto';
import { UpdatePasswordAdminDto } from '../dto/update_password_admin.dto';
import { AdminRolType } from '../../utils/enums/admin_roles.enum';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth } from '../../auth/decorators/auth.decorator';
import { ForgotPasswordAdminDto } from '../dto/forgot_password_admin.dto';
import { ResetPasswordAdminDto } from '../dto/reset_password_admin.dto';

@ApiTags('admins')
@ApiBearerAuth()
@Controller('admins')
export class AdminsController {
  constructor(private adminsService: AdminsService) {}

  // GET METHODS //

  @Auth(AdminRolType.SUPER_ADMIN, AdminRolType.ADMIN)
  @Get('/getAllAdmins')
  async getAllAdmins() {
    return this.adminsService.getAllAdmins();
  }

  @Auth(AdminRolType.SUPER_ADMIN, AdminRolType.ADMIN)
  @Get('/getAdmin/:id')
  async getAdminById(@Param('id') id: number) {
    return await this.adminsService.getAdminById(id);
  }

  @Get('/getAdminByIdNumber/:id')
  async getAdminByIdNumber(@Param('id') idNumber: number) {
    return await this.adminsService.getAdminByIdNumber(idNumber);
  }

  @Auth(AdminRolType.SUPER_ADMIN, AdminRolType.ADMIN)
  @Get('/getAdminByIdTypeAndNumber/:idType/:idNumber')
  async getAdminFoundByIdNumber(
    @Param('idType') idType: number,
    @Param('idNumber') idNumber: number,
  ) {
    return await this.adminsService.getAdminFoundByIdNumber(idType, idNumber);
  }

  // PATCH METHODS //

  @Auth(AdminRolType.SUPER_ADMIN, AdminRolType.ADMIN)
  @Patch('/updateAdmin/:id')
  async updateAdmin(
    @Param('id')
    id: number,
    @Body() admin: UpdateAdminDto,
  ) {
    return await this.adminsService.updateAdmin(id, admin);
  }

  @Auth(AdminRolType.SUPER_ADMIN, AdminRolType.ADMIN)
  @Patch('/updatePassword/:id')
  async updateAdminPassword(
    @Param('id')
    id: number,
    @Body()
    passwords: UpdatePasswordAdminDto,
  ) {
    return await this.adminsService.updateAdminPassword(id, passwords);
  }

  @Patch('/forgotAdminsPassword')
  async forgotAdminPassword(
    @Body()
    { admin_id_type, id_number, corporate_email }: ForgotPasswordAdminDto,
  ) {
    return await this.adminsService.forgotAdminPassword({
      admin_id_type,
      id_number,
      corporate_email,
    });
  }

  @Patch('/resetPassword')
  async resetAdminPassword(
    @Query('token') token: string,
    @Body()
    { newPassword }: ResetPasswordAdminDto,
  ) {
    return await this.adminsService.resetAdminPassword(token, { newPassword });
  }

  @Auth(AdminRolType.SUPER_ADMIN, AdminRolType.ADMIN)
  @Patch('/banAdmin/:id')
  async banAdmins(@Param('id') id: number) {
    return await this.adminsService.banAdmins(id);
  }
}
