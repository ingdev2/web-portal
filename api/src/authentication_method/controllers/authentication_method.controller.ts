import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthenticationMethodService } from '../services/authentication_method.service';
import { CreateAuthenticationMethodDto } from '../dto/create-authentication_method.dto';
import { UpdateAuthenticationMethodDto } from '../dto/update-authentication_method.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth } from '../../auth/decorators/auth.decorator';
import { AdminRolType } from '../../common/enums/admin_roles.enum';

@ApiTags('authentication-method')
@ApiBearerAuth()
@Controller('authentication-method')
export class AuthenticationMethodController {
  constructor(
    private readonly authenticationMethodService: AuthenticationMethodService,
  ) {}

  // POST METHODS //

  @Auth(AdminRolType.SUPER_ADMIN)
  @Post('/create')
  createAuthenticationMethod(
    @Body() createAuthenticationMethod: CreateAuthenticationMethodDto,
  ) {
    return this.authenticationMethodService.createAuthenticationMethod(
      createAuthenticationMethod,
    );
  }

  // GET METHODS //

  @Get('/getAll')
  getAllAuthenticationMethods() {
    return this.authenticationMethodService.getAllAuthenticationMethods();
  }

  // PATCH METHODS //

  @Auth(AdminRolType.SUPER_ADMIN)
  @Patch('/update/:id')
  updateAuthenticationMethod(
    @Param('id') id: number,
    @Body() updateAuthenticationMethod: UpdateAuthenticationMethodDto,
  ) {
    return this.authenticationMethodService.updateAuthenticationMethod(
      id,
      updateAuthenticationMethod,
    );
  }
}
