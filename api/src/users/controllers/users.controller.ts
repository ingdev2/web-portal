import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserPersonDto } from '../dto/create_user_person.dto';
import { UsersService } from '../services/users.service';
import { UpdateUserPersonDto } from '../dto/update_user_person.dto';
import { CreateUserEpsDto } from '../dto/create_user_eps.dto';
import { UpdateUserEpsDto } from '../dto/update_user_eps.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/createUserPerson')
  async createUserPerson(@Body() newUserPerson: CreateUserPersonDto) {
    return await this.usersService.createUserPerson(newUserPerson);
  }

  @Post('/createUserEps')
  async createUserEps(@Body() newUserEps: CreateUserEpsDto) {
    return await this.usersService.createUserEps(newUserEps);
  }

  @Get('/getAllPerson')
  async getUsersPerson() {
    return await this.usersService.getUsersPerson();
  }

  @Get('/getAllEps')
  async getUsersEps() {
    return await this.usersService.getUsersEps();
  }

  @Get('/person/:id')
  async getUserPersonById(@Param('id', ParseIntPipe) id: string) {
    return await this.usersService.getUserPersonById(id);
  }

  @Get('/eps/:id')
  async getUserEpsById(@Param('id', ParseIntPipe) id: string) {
    return await this.usersService.getUserEpsById(id);
  }

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
  async banUserPerson(@Param('id') id: string) {
    return await this.usersService.banUserPerson(id);
  }

  @Patch('/ban/:id')
  async banUserEps(@Param('id') id: string) {
    return await this.usersService.banUserEps(id);
  }
}
