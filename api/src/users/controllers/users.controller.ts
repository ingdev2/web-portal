import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateUserPersonDto } from '../dto/create_user_person.dto';
import { UsersService } from '../services/users.service';
import { UpdateUserPersonDto } from '../dto/update_user_person.dto';
import { CreateUserEpsDto } from '../dto/create_user_eps.dto';
import { UpdateUserEpsDto } from '../dto/update_user_eps.dto';

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

  @Patch('/updatePerson/:id')
  async updateUserPerson(
    @Param('id') id: string,
    @Body() user: UpdateUserPersonDto,
  ) {
    return await this.usersService.updateUserPerson(id, user);
  }

  @Patch('/updateEps/:id')
  async updateUserEps(@Param('id') id: string, @Body() user: UpdateUserEpsDto) {
    return await this.usersService.updateUserEps(id, user);
  }

  @Patch('/ban/:id')
  async banUsers(@Param('id') id: string) {
    return await this.usersService.banUsers(id);
  }
}
