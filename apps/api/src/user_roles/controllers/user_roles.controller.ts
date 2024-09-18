import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserRolesService } from '../services/user_roles.service';
import { CreateUserRoleDto } from '../dto/create-user_role.dto';
import { UpdateUserRoleDto } from '../dto/update-user_role.dto';
import { AdminRolType } from 'shared/utils/enums/admin_roles.enum';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth } from '../../auth/decorators/auth.decorator';

@ApiTags('user-roles')
@ApiBearerAuth()
@Auth(AdminRolType.SUPER_ADMIN, AdminRolType.ADMIN)
@Controller('user-roles')
export class UserRolesController {
  constructor(private readonly userRolesService: UserRolesService) {}

  // POST METHODS //

  @Post('/create')
  createUserRole(@Body() createUserRole: CreateUserRoleDto) {
    return this.userRolesService.createUserRole(createUserRole);
  }

  // GET METHODS //

  @Get('/getAll')
  getAllUserRoles() {
    return this.userRolesService.getAllUserRoles();
  }

  // PATCH METHODS //

  @Patch('/update/:id')
  updateUserRole(
    @Param('id') id: number,
    @Body() updateUserRole: UpdateUserRoleDto,
  ) {
    return this.userRolesService.updateUserRole(id, updateUserRole);
  }
}
