import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/services/users.service';
import { CreateUserPersonDto } from 'src/users/dto/create_user_person.dto';
import { CreateUserEpsDto } from 'src/users/dto/create_user_eps.dto';
import { LoginDto } from '../dto/login.dto';

import * as bcryptjs from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { CreateAdminDto } from 'src/admins/dto/create_admin.dto';
import { AdminsService } from 'src/admins/services/admins.service';
import { CreateSuperAdminDto } from 'src/admins/dto/create_super_admin.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly adminsService: AdminsService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  // REGISTER FUNTIONS //

  async registerSuperAdmin({
    name,
    last_name,
    gender,
    id_type,
    id_number,
    corporate_email,
    password,
    company_area,
    role,
  }: CreateSuperAdminDto) {
    await this.adminsService.getSuperAdminByIdNumber(id_number);

    return await this.adminsService.createSuperAdmin({
      name,
      last_name,
      gender,
      id_type,
      id_number,
      corporate_email,
      password: await bcryptjs.hash(password, 10),
      company_area,
      role,
    });
  }

  async registerAdmin({
    name,
    last_name,
    gender,
    id_type,
    id_number,
    corporate_email,
    password,
    company_area,
    role,
  }: CreateAdminDto) {
    await this.adminsService.getAdminByIdNumber(id_number);

    return await this.adminsService.createAdmin({
      name,
      last_name,
      gender,
      id_type,
      id_number,
      corporate_email,
      password: await bcryptjs.hash(password, 10),
      company_area,
      role,
    });
  }

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
    role,
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
      role,
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
    role,
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
      role,
    });
  }

  // LOGIN FUNTIONS //

  async loginUsers({ id_number, password }: LoginDto) {
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

    const payload = { id_number: userFound.id_number, role: userFound.role };

    const token = await this.jwtService.signAsync(payload);

    return { token, id_number };
  }

  async loginAdmins({ id_number, password }: LoginDto) {
    const adminFound =
      await this.adminsService.getAdminFoundByIdNumber(id_number);

    if (!adminFound) {
      return new HttpException(
        `¡El número de identificación es incorrecto!`,
        HttpStatus.NOT_FOUND,
      );
    }

    const isCorrectPassword = await bcryptjs.compare(
      password,
      adminFound.password,
    );

    if (!isCorrectPassword) {
      return new HttpException(`¡Contraseña incorrecta!`, HttpStatus.CONFLICT);
    }

    const payload = { id_number: adminFound.id_number, role: adminFound.role };

    const token = await this.jwtService.signAsync(payload);

    return { token, id_number };
  }

  async profileAdmin({
    id_number,
    role,
  }: {
    id_number: number;
    role: Enumerator;
  }) {
    return await this.adminsService.getAdminFoundByIdNumber(id_number);
  }

  async profileUser({
    id_number,
    role,
  }: {
    id_number: number;
    role: Enumerator;
  }) {
    return await this.usersService.getUserFoundByIdNumber(id_number);
  }
}
