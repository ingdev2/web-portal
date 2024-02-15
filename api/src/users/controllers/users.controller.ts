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
  async getUserPersonByIdNumber(@Param('id', ParseIntPipe) id_number: number) {
    return await this.usersService.getUserPersonByIdNumber(id_number);
  }

  @Get('/eps/:id')
  async getUserEpsByIdNumber(@Param('id', ParseIntPipe) id_number: number) {
    return await this.usersService.getUserEpsByIdNumber(id_number);
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
}
