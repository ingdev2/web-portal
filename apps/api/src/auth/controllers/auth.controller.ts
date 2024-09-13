import { Body, Controller, Param, Post, Req } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { CreateSuperAdminDto } from '../../admins/dto/create_super_admin.dto';
import { CreateAdminDto } from '../../admins/dto/create_admin.dto';
import { CreateUserPatientDto } from '../../users/dto/create_user_patient.dto';
import { CreateAuthorizedFamiliarDto } from '../../authorized_familiar/dto/create-authorized_familiar.dto';
import { CreateUserEpsDto } from '../../users/dto/create_user_eps.dto';
import { ValidatePatientDto } from '../../users/dto/validate_patient.dto';
import { FamiliarLoginDto } from '../dto/familiar_login.dto';
import { LoginDto } from '../dto/login.dto';
import { IdNumberDto } from '../dto/id_number.dto';
import { AdminRolType } from '../../utils/enums/admin_roles.enum';
import { UserRolType } from '../../utils/enums/user_roles.enum';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Auth } from '../decorators/auth.decorator';
import { EnableAuditLog } from 'src/audit_logs/decorators/enable-audit-log.decorator';

@ApiTags('auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // VALIDATE PATIENT

  @Post('/validatePatient')
  async validateThatThePatientExist(
    @Body()
    { idType, idNumber }: ValidatePatientDto,
  ) {
    return await this.authService.validateThatThePatientExist({
      idType,
      idNumber,
    });
  }

  // REGISTER

  @Post('validatePatientRegister')
  async validatePatientRegister(@Body() { id_type, id_number }: IdNumberDto) {
    return await this.authService.validatePatientRegister({
      id_type,
      id_number,
    });
  }

  @EnableAuditLog()
  @Auth(AdminRolType.SUPER_ADMIN)
  @Post('registerSuperAdmin')
  async registerSuperAdmin(
    @Body() registerSuperAdmin: CreateSuperAdminDto,
    @Req() requestAuditLog: any,
  ) {
    return await this.authService.registerSuperAdmin(
      registerSuperAdmin,
      requestAuditLog,
    );
  }

  @EnableAuditLog()
  @Auth(AdminRolType.SUPER_ADMIN)
  @Post('registerAdmin')
  async registerAdmin(
    @Body() registerAdmin: CreateAdminDto,
    @Req() requestAuditLog: any,
  ) {
    return await this.authService.registerAdmin(registerAdmin, requestAuditLog);
  }

  @Post('registerUserPatient')
  async registerUserPatient(@Body() registerUserPatient: CreateUserPatientDto) {
    return await this.authService.registerUserPatient(registerUserPatient);
  }

  @Auth(UserRolType.PATIENT)
  @Post(':patientId/registerFamiliar')
  async registerFamiliar(
    @Param('patientId') patientId: string,
    @Body() registerFamiliar: CreateAuthorizedFamiliarDto,
  ) {
    return await this.authService.registerFamiliar(patientId, registerFamiliar);
  }

  @EnableAuditLog()
  @Auth(AdminRolType.SUPER_ADMIN, AdminRolType.ADMIN)
  @Post('registerUserEps')
  async registerUserEps(
    @Body() registerUserEps: CreateUserEpsDto,
    @Req() requestAuditLog: any,
  ) {
    return await this.authService.registerUserEps(
      registerUserEps,
      requestAuditLog,
    );
  }

  // LOGIN

  @Post('refreshToken')
  async refreshToken(@Req() request: Request) {
    const [type, token] = request.headers['authorization']?.split(' ') || [];

    return this.authService.refreshToken(token);
  }

  @Post('loginAdmins')
  async loginAdmins(@Body() loginAdmin: LoginDto) {
    return await this.authService.loginAdmins(loginAdmin);
  }

  @Post('verifiedLoginAdmins/:id_number')
  async verifyCodeAndLoginAdmins(
    @Param('id_number') id_number: number,
    @Body('verification_code') verification_code: number,
    @Req() requestAuditLog: any,
  ) {
    return await this.authService.verifyCodeAndLoginAdmins(
      id_number,
      verification_code,
      requestAuditLog,
    );
  }

  @Post('resendVerificationAdminCode')
  async resendVerificationAdminCode(@Body() loginDto: LoginDto) {
    return await this.authService.resendVerificationAdminCode(loginDto);
  }

  @Post('loginPatientUsers')
  async loginPatientUsers(@Body() loginPatient: LoginDto) {
    return await this.authService.loginPatientUsers(loginPatient);
  }

  @Post('loginEpsUsers')
  async loginEpsUsers(@Body() loginEps: LoginDto) {
    return await this.authService.loginEpsUsers(loginEps);
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

  @Post('resendVerificationUserCode')
  async resendVerificationUserCode(@Body() loginDto: LoginDto) {
    return await this.authService.resendVerificationUserCode(loginDto);
  }

  @Post('verifiedLoginRelatives/:id_number')
  async verifyCodeAndLoginRelatives(
    @Param('id_number') id_number: number,
    @Body('verification_code') verification_code: number,
  ) {
    return await this.authService.verifyCodeAndLoginRelatives(
      id_number,
      verification_code,
    );
  }

  @Post('resendVerificationFamiliarCode')
  async resendVerificationFamiliarCode(
    @Body() loginFamiliarDto: FamiliarLoginDto,
  ) {
    return await this.authService.resendVerificationFamiliarCode(
      loginFamiliarDto,
    );
  }
}
