import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UpdateUserPersonDto } from '../dto/update_user_person.dto';
import { UpdateUserEpsDto } from '../dto/update_user_eps.dto';
import { UpdatePasswordUserDto } from '../dto/update_password_user.dto';
import { ValidatePatientDto } from '../dto/validate_patient.dto';
import { AdminRolType } from '../../common/enums/admin_roles.enum';
import { UserRolType } from '../../common/enums/user_roles.enum';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth } from '../../auth/decorators/auth.decorator';

@ApiTags('users')
@ApiBearerAuth()
@Auth(AdminRolType.SUPER_ADMIN)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  // GET METHODS //

  @Auth(AdminRolType.ADMIN)
  @Get('/validatePatient')
  async validateThatThePatientExist(
    @Body()
    patientData: ValidatePatientDto,
  ) {
    return await this.usersService.validateThatThePatientExist(patientData);
  }

  @Get('/getAllPerson')
  async getAllUsersPerson() {
    return await this.usersService.getAllUsersPerson();
  }

  @Get('/getAllEps')
  async getAllUsersEps() {
    return await this.usersService.getAllUsersEps();
  }

  @Get('/getUser/:id')
  async getUsersById(@Param('id') id: string) {
    return await this.usersService.getUsersById(id);
  }

  @Get('/getUserById/:idNumber')
  async getUsersByIdNumber(@Param('idNumber') idNumber: number) {
    return await this.usersService.getUsersByIdNumber(idNumber);
  }

  @Get('/validateCode/:id')
  async getUserFoundByIdAndCode(
    @Param('id') id: number,
    @Body('verificationCode')
    verificationCode: number,
  ) {
    return await this.usersService.getUserFoundByIdAndCode(
      id,
      verificationCode,
    );
  }

  // PATCH METHODS //

  @Auth(UserRolType.PATIENT)
  @Patch('/updatePerson/:id')
  async updateUserPerson(
    @Param('id') id: string,
    @Body() user: UpdateUserPersonDto,
  ) {
    return await this.usersService.updateUserPerson(id, user);
  }

  @Auth(UserRolType.EPS)
  @Patch('/updateEps/:id')
  async updateUserEps(@Param('id') id: string, @Body() user: UpdateUserEpsDto) {
    return await this.usersService.updateUserEps(id, user);
  }

  @Auth(UserRolType.PATIENT, UserRolType.EPS, AdminRolType.ADMIN)
  @Patch('/updatePassword/:id')
  async updateUserPassword(
    @Param('id')
    id: string,
    @Body()
    passwords: UpdatePasswordUserDto,
  ) {
    return await this.usersService.updateUserPassword(id, passwords);
  }

  @Patch('/ban/:id')
  async banUsers(@Param('id') id: string) {
    return await this.usersService.banUsers(id);
  }
}
