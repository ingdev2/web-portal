import { Body, Controller, Param, Post } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { CreateAdminDto } from '../../admins/dto/create_admin.dto';
import { CreateUserPatientDto } from '../../users/dto/create_user_person.dto';
import { CreateAuthorizedFamiliarDto } from '../../authorized_familiar/dto/create-authorized_familiar.dto';
import { CreateUserEpsDto } from '../../users/dto/create_user_eps.dto';
import { FamiliarLoginDto } from '../dto/familiar_login.dto';
import { LoginDto } from '../dto/login.dto';

import { ApiTags } from '@nestjs/swagger';
import { UUID } from 'crypto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // POST METHODS //

  // REGISTER

  @Post('registerSuperAdmin')
  async registerSuperAdmin(@Body() registerSuperAdmin: CreateAdminDto) {
    return await this.authService.registerSuperAdmin(registerSuperAdmin);
  }

  @Post('registerAdmin')
  async registerAdmin(@Body() registerAdmin: CreateAdminDto) {
    return await this.authService.registerAdmin(registerAdmin);
  }

  @Post('registerUserPatient')
  async registerUserPatient(@Body() registerUserPatient: CreateUserPatientDto) {
    return await this.authService.registerUserPatient(registerUserPatient);
  }

  @Post(':userId/registerFamiliar')
  async registerFamiliar(
    @Param('userId') userId: string,
    @Body() registerFamiliar: CreateAuthorizedFamiliarDto,
  ) {
    return await this.authService.registerFamiliar(userId, registerFamiliar);
  }

  @Post('registerUserEps')
  async registerUserEps(@Body() registerUserEps: CreateUserEpsDto) {
    return await this.authService.registerUserEps(registerUserEps);
  }

  // LOGIN

  @Post('loginAdmins')
  async loginAdmins(@Body() loginUser: LoginDto) {
    return await this.authService.loginAdmins(loginUser);
  }

  @Post('loginUsers')
  async loginUsers(@Body() loginAdmin: LoginDto) {
    return await this.authService.loginUsers(loginAdmin);
  }

  @Post('loginRelatives')
  async loginRelatives(@Body() loginFamiliar: FamiliarLoginDto) {
    return await this.authService.loginRelatives(loginFamiliar);
  }

  @Post('verifiedLoginUsers/:idNumber')
  async verifyCodeAndLoginUsers(
    @Param('idNumber') idNumber: number,
    @Body('verification_code') verification_code: number,
  ) {
    return await this.authService.verifyCodeAndLoginUsers(
      idNumber,
      verification_code,
    );
  }

  @Post('verifiedLoginRelatives/:idNumber')
  async verifyCodeAndLoginRelatives(
    @Param('idNumber') idNumber: number,
    @Body('verification_code') verification_code: number,
  ) {
    return await this.authService.verifyCodeAndLoginRelatives(
      idNumber,
      verification_code,
    );
  }
}
