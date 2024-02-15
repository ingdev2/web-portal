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
import { User } from '../user.entity';
import { UpdateUserPersonDto } from '../dto/update_user_person.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/createUserPerson')
  async createUserPerson(@Body() newUserPerson: CreateUserPersonDto) {
    return await this.usersService.createUserPerson(newUserPerson);
  }

  @Get('/getAllPerson')
  async getUsersPerson() {
    return await this.usersService.getUsersPerson();
  }

  @Get('/person/:id')
  async getUserPersonByIdNumber(@Param('id', ParseIntPipe) id_number: number) {
    return await this.usersService.getUserByIdNumber(id_number);
  }

  @Patch('/update/:id')
  async banUser(@Param('id') id: string, @Body() user: UpdateUserPersonDto) {
    return await this.usersService.updateUserPerson(id, user);
  }

  @Patch('/ban/:id')
  async banUserPerson(@Param('id') id: string) {
    return await this.usersService.banUserPerson(id);
  }
}
