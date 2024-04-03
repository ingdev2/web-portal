import { Body, Controller, Param, Post } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { CreateAdminDto } from '../../admins/dto/create_admin.dto';
import { CreateUserPatientDto } from '../../users/dto/create_user_patient.dto';
import { CreateAuthorizedFamiliarDto } from '../../authorized_familiar/dto/create-authorized_familiar.dto';
import { CreateUserEpsDto } from '../../users/dto/create_user_eps.dto';
import { FamiliarLoginDto } from '../dto/familiar_login.dto';
import { LoginDto } from '../dto/login.dto';
import { AdminRolType } from '../../common/enums/admin_roles.enum';
import { UserRolType } from '../../common/enums/user_roles.enum';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Auth } from '../../auth/decorators/auth.decorator';

@ApiTags('auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // POST METHODS //

  // REGISTER

  @Post('registerSuperAdmin')
  async registerSuperAdmin(@Body() registerSuperAdmin: CreateAdminDto) {
    return await this.authService.registerSuperAdmin(registerSuperAdmin);
  }

  @Auth(AdminRolType.SUPER_ADMIN)
  @Post('registerAdmin')
  async registerAdmin(@Body() registerAdmin: CreateAdminDto) {
    return await this.authService.registerAdmin(registerAdmin);
  }

  @Post('registerUserPatient')
  async registerUserPatient(@Body() registerUserPatient: CreateUserPatientDto) {
    return await this.authService.registerUserPatient(registerUserPatient);
  }

  @Auth(AdminRolType.SUPER_ADMIN, AdminRolType.ADMIN, UserRolType.PATIENT)
  @Post(':userId/registerFamiliar')
  async registerFamiliar(
    @Param('userId') userId: string,
    @Body() registerFamiliar: CreateAuthorizedFamiliarDto,
  ) {
    return await this.authService.registerFamiliar(userId, registerFamiliar);
  }

  @Auth(AdminRolType.SUPER_ADMIN, AdminRolType.ADMIN)
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

  @Post('verifiedLoginUsers/:id_number')
  async verifyCodeAndLoginUsers(
    @Param('id_number') id_number: number,
    @Body('verification_code') verification_code: number,
  ) {
    return await this.authService.verifyCodeAndLoginUsers(
      id_number,
      verification_code,
    );
  }

  @Post('resendVerificationCode')
  async resendVerificationCode(@Body() loginDto: LoginDto) {
    return await this.authService.resendVerificationCode(loginDto);
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
