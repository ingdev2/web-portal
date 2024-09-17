import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UpdateUserPatientDto } from '../dto/update_user_patient.dto';
import { UpdateUserEpsDto } from '../dto/update_user_eps.dto';
import { UpdatePasswordUserDto } from '../dto/update_password_user.dto';
import { AdminRolType } from 'shared/utils/enums/admin_roles.enum';
import { UserRolType } from 'shared/utils/enums/user_roles.enum';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth } from '../../auth/decorators/auth.decorator';
import { ForgotPasswordUserPatientDto } from '../dto/forgot_password_user_patient.dto';
import { ForgotPasswordUserEpsDto } from '../dto/forgot_password_user_eps.dto';
import { ResetPasswordUserDto } from '../dto/reset_password_user.dto';
import { EnableAuditLog } from 'src/audit_logs/decorators/enable-audit-log.decorator';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  // GET METHODS //

  @Post('/transformIdTypeName')
  async transformIdTypeName(
    @Body('idTypeAbbrev')
    idTypeAbbrev: string,
  ) {
    return await this.usersService.transformIdTypeName(idTypeAbbrev);
  }

  @Post('/transformIdTypeNumber')
  async transformIdTypeNumber(
    @Body('idTypeAbbrev')
    idTypeAbbrev: string,
  ) {
    return await this.usersService.transformIdTypeNumber(idTypeAbbrev);
  }

  @Post('/transformGenderName')
  async transformGenderName(
    @Body('genderAbbrev')
    genderAbbrev: string,
  ) {
    return await this.usersService.transformGenderName(genderAbbrev);
  }

  @Post('/transformGenderNumber')
  async transformGenderNumber(
    @Body('genderAbbrev')
    genderAbbrev: string,
  ) {
    return await this.usersService.transformGenderNumber(genderAbbrev);
  }

  @Auth(AdminRolType.SUPER_ADMIN, AdminRolType.ADMIN)
  @Get('/getAllUsers')
  async getAllUsers() {
    return await this.usersService.getAllUsers();
  }

  @Auth(AdminRolType.SUPER_ADMIN, AdminRolType.ADMIN)
  @Get('/getAllPatient')
  async getAllUsersPatient() {
    return await this.usersService.getAllUsersPatient();
  }

  @Auth(AdminRolType.SUPER_ADMIN, AdminRolType.ADMIN)
  @Get('/getAllEps')
  async getAllUsersEps() {
    return await this.usersService.getAllUsersEps();
  }

  @Auth(AdminRolType.SUPER_ADMIN, AdminRolType.ADMIN)
  @Get('/getUser/:id')
  async getUsersById(@Param('id') id: string) {
    return await this.usersService.getUsersById(id);
  }

  @Get('/getUserByIdNumber/:idType/:idNumber')
  async getUserFoundByIdNumber(
    @Param('idType') idType: number,
    @Param('idNumber') idNumber: number,
  ) {
    return await this.usersService.getUserFoundByIdNumber(idType, idNumber);
  }

  @Auth(UserRolType.PATIENT, AdminRolType.SUPER_ADMIN, AdminRolType.ADMIN)
  @Get('/getAllRelatives/:patientId')
  async getAllAuthorizedPatientRelatives(
    @Param('patientId') patientId: string,
  ) {
    return await this.usersService.getAllAuthorizedPatientRelatives(patientId);
  }

  @Get('/getPatientUserByIdNumber/:idNumber')
  async getPatientUserByIdNumber(@Param('idNumber') idNumber: number) {
    return await this.usersService.getPatientUserByIdNumber(idNumber);
  }

  @Get('/getEpsUserByIdNumber/:idNumber')
  async getEpsUserByIdNumber(@Param('idNumber') idNumber: number) {
    return await this.usersService.getEpsUserByIdNumber(idNumber);
  }

  // PATCH METHODS //

  @EnableAuditLog()
  @Auth(UserRolType.PATIENT, AdminRolType.SUPER_ADMIN, AdminRolType.ADMIN)
  @Patch('/updatePatient/:id')
  async updateUserPerson(
    @Param('id') id: string,
    @Body() user: UpdateUserPatientDto,
    @Req() requestAuditLog: any,
  ) {
    return await this.usersService.updateUserPatient(id, user, requestAuditLog);
  }

  @EnableAuditLog()
  @Auth(UserRolType.EPS, AdminRolType.SUPER_ADMIN, AdminRolType.ADMIN)
  @Patch('/updateEps/:id')
  async updateUserEps(
    @Param('id') id: string,
    @Body() user: UpdateUserEpsDto,
    @Req() requestAuditLog: any,
  ) {
    return await this.usersService.updateUserEps(id, user, requestAuditLog);
  }

  @EnableAuditLog()
  @Auth(
    UserRolType.PATIENT,
    UserRolType.EPS,
    AdminRolType.SUPER_ADMIN,
    AdminRolType.ADMIN,
  )
  @Patch('/updatePassword/:id')
  async updateUserPassword(
    @Param('id')
    id: string,
    @Body()
    passwords: UpdatePasswordUserDto,
    @Req() requestAuditLog: any,
  ) {
    return await this.usersService.updateUserPassword(
      id,
      passwords,
      requestAuditLog,
    );
  }

  @Patch('/forgotPatientPassword')
  async forgotUserPatientPassword(
    @Body()
    { id_type, id_number, birthdate }: ForgotPasswordUserPatientDto,
  ) {
    return await this.usersService.forgotUserPatientPassword({
      id_type,
      id_number,
      birthdate,
    });
  }

  @Patch('/forgotEpsPassword')
  async forgotUserEpsPassword(
    @Body()
    { id_type, id_number, eps_company }: ForgotPasswordUserEpsDto,
  ) {
    return await this.usersService.forgotUserEpsPassword({
      id_type,
      id_number,
      eps_company,
    });
  }

  @Patch('/resetPassword')
  async resetUserPassword(
    @Query('token') token: string,
    @Body()
    { newPassword }: ResetPasswordUserDto,
  ) {
    return await this.usersService.resetUserPassword(token, { newPassword });
  }

  @EnableAuditLog()
  @Auth(AdminRolType.SUPER_ADMIN, AdminRolType.ADMIN)
  @Patch('/ban/:id')
  async banUsers(@Param('id') id: string, @Req() requestAuditLog: any) {
    return await this.usersService.banUsers(id, requestAuditLog);
  }
}
