import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UpdateUserPersonDto } from '../dto/update_user_person.dto';
import { UpdateUserEpsDto } from '../dto/update_user_eps.dto';
import { Auth } from '../../auth/decorators/auth.decorator';
import { AdminRolType } from '../../common/enums/admin_roles.enum';
import { UserRolType } from '../../common/enums/user_roles.enum';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@ApiBearerAuth()
@Auth(AdminRolType.SUPER_ADMIN)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  // GET METHODS //

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

  // PATCH METHODS //

  @Auth(AdminRolType.SUPER_ADMIN)
  @Auth(UserRolType.PERSON)
  @Patch('/updatePerson/:id')
  async updateUserPerson(
    @Param('id') id: string,
    @Body() user: UpdateUserPersonDto,
  ) {
    return await this.usersService.updateUserPerson(id, user);
  }

  @Auth(AdminRolType.SUPER_ADMIN)
  @Auth(UserRolType.EPS)
  @Patch('/updateEps/:id')
  async updateUserEps(@Param('id') id: string, @Body() user: UpdateUserEpsDto) {
    return await this.usersService.updateUserEps(id, user);
  }

  @Patch('/ban/:id')
  async banUsers(@Param('id') id: string) {
    return await this.usersService.banUsers(id);
  }
}
