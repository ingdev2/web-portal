import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { CreateAdminDto } from 'src/admins/dto/create_admin.dto';
import { CreateUserPersonDto } from 'src/users/dto/create_user_person.dto';
import { CreateUserEpsDto } from 'src/users/dto/create_user_eps.dto';
import { LoginDto } from '../dto/login.dto';
import { Request } from 'express';
import { Auth } from '../decorators/auth.decorator';
import { AdminRolType } from '../../common/enums/admin_roles.enum';
import { UserRolType } from '../../common/enums/user_roles.enum';
import { ActiveUser } from 'src/common/decorators/active_user.decorator';
import { UserActiveInterface } from 'src/common/interfaces/user_active.interface';

interface RequestWithUser extends Request {
  user: {
    id_number: number;
    role: Enumerator;
  };
}

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

  @Post('registerUserPerson')
  async registerUserPerson(@Body() registerUserPerson: CreateUserPersonDto) {
    return await this.authService.registerUserPerson(registerUserPerson);
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

  // FORMAS DE AUTH ROLES //

  // OPCION 1

  // @Get('profile')
  // @Roles(UserRolType.EPS)
  // @UseGuards(AuthGuard, RolesGuard)
  // profile(@Req() req: RequestWithUser) {
  //   return this.authService.profileUser(req.user);
  // }

  // OPCION 1

  // @Get('profile')
  // @Auth(UserRolType.PERSON)
  // profile(@ActiveUser() user: UserActiveInterface) {
  //   return this.authService.profileUser(user);
  // }
}
