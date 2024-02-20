import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/services/users.service';
import { CreateUserPersonDto } from 'src/users/dto/create_user_person.dto';
import { CreateUserEpsDto } from 'src/users/dto/create_user_eps.dto';
import { LoginDto } from '../dto/login.dto';

import * as bcryptjs from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  // REGISTER FUNTIONS //

  async registerUserPerson({
    name,
    last_name,
    gender,
    birthay_date,
    id_type,
    id_number,
    id_exp_date,
    email,
    cellphone,
    password,
    residence_department,
    residence_city,
    residence_address,
    residence_neighborhood,
    rol,
  }: CreateUserPersonDto) {
    await this.usersService.getUsersByIdNumber(id_number);

    return await this.usersService.createUserPerson({
      name,
      last_name,
      gender,
      birthay_date,
      id_type,
      id_number,
      id_exp_date,
      email,
      cellphone,
      password: await bcryptjs.hash(password, 10),
      residence_department,
      residence_city,
      residence_address,
      residence_neighborhood,
      rol,
    });
  }

  async registerUserEps({
    name,
    last_name,
    gender,
    id_type,
    id_number,
    company_name,
    company_area,
    email,
    password,
    rol,
  }: CreateUserEpsDto) {
    await this.usersService.getUsersByIdNumber(id_number);

    return await this.usersService.createUserEps({
      name,
      last_name,
      gender,
      id_type,
      id_number,
      company_name,
      company_area,
      email,
      password: await bcryptjs.hash(password, 10),
      rol,
    });
  }

  // LOGIN FUNTIONS //

  async login({ id_number, password }: LoginDto) {
    const userFound = await this.usersService.getUserFoundByIdNumber(id_number);

    if (!userFound) {
      return new HttpException(
        `¡El número de identificación es incorrecto!`,
        HttpStatus.NOT_FOUND,
      );
    }

    const isCorrectPassword = await bcryptjs.compare(
      password,
      userFound.password,
    );

    if (!isCorrectPassword) {
      return new HttpException(`¡Contraseña incorrecta!`, HttpStatus.CONFLICT);
    }

    const payload = { id_number: userFound.id_number };

    const token = await this.jwtService.signAsync(payload);

    return { token, id_number };
  }
}
