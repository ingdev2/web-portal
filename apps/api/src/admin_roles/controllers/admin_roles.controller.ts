import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { AdminRolesService } from '../services/admin_roles.service';
import { CreateAdminRoleDto } from '../dto/create-admin_role.dto';
import { UpdateAdminRoleDto } from '../dto/update-admin_role.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth } from '../../auth/decorators/auth.decorator';
import { AdminRolType } from '../../utils/enums/admin_roles.enum';

@ApiTags('admin-roles')
@ApiBearerAuth()
@Controller('admin-roles')
export class AdminRolesController {
  constructor(private readonly adminRolesService: AdminRolesService) {}

  // POST METHODS //

  @Auth(AdminRolType.SUPER_ADMIN)
  @Post('/create')
  createAdminRole(@Body() createAdminRole: CreateAdminRoleDto) {
    return this.adminRolesService.createAdminRole(createAdminRole);
  }

  // GET METHODS //

  @Get('/getAll')
  getAllAdminRoles() {
    return this.adminRolesService.getAllAdminRoles();
  }

  @Get('/getByName')
  getAdminRoleByName(@Query('name') name?: AdminRolType) {
    return this.adminRolesService.getAdminRoleByName(name);
  }

  // PATCH METHODS //

  @Auth(AdminRolType.SUPER_ADMIN)
  @Patch('/update/:id')
  updateAdminRole(
    @Param('id') id: number,
    @Body() updateAdminRole: UpdateAdminRoleDto,
  ) {
    return this.adminRolesService.updateAdminRole(id, updateAdminRole);
  }
}
