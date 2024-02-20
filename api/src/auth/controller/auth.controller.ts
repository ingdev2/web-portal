import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { CreateUserPersonDto } from 'src/users/dto/create_user_person.dto';
import { CreateUserEpsDto } from 'src/users/dto/create_user_eps.dto';
import { LoginDto } from '../dto/login.dto';
import { AuthGuard } from '../guard/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // POST METHODS //

  @Post('registerUserPerson')
  async registerUserPerson(@Body() registerUserPerson: CreateUserPersonDto) {
    return await this.authService.registerUserPerson(registerUserPerson);
  }

  @Post('registerUserEps')
  async registerUserEps(@Body() registerUserEps: CreateUserEpsDto) {
    return await this.authService.registerUserEps(registerUserEps);
  }

  @Post('login')
  async login(@Body() loginUser: LoginDto) {
    return await this.authService.login(loginUser);
  }

  // GET METHODS //

  @Get('profile')
  @UseGuards(AuthGuard)
  profile(
    @Request()
    req,
  ) {
    return req.user;
  }
}
