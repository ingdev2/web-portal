import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AdminsService } from '../../admins/services/admins.service';
import { UsersService } from '../../users/services/users.service';
import { CreateSuperAdminDto } from '../../admins/dto/create_super_admin.dto';
import { CreateAdminDto } from '../../admins/dto/create_admin.dto';
import { CreateUserPersonDto } from '../../users/dto/create_user_person.dto';
import { CreateUserEpsDto } from '../../users/dto/create_user_eps.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '../dto/login.dto';

import * as bcryptjs from 'bcryptjs';

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
    admin_gender,
    admin_id_type,
    id_number,
    corporate_email,
    password,
    company_area,
    admin_role,
  }: CreateSuperAdminDto) {
    await this.adminsService.getSuperAdminByIdNumber(id_number);

    return await this.adminsService.createSuperAdmin({
      name,
      last_name,
      admin_gender,
      admin_id_type,
      id_number,
      corporate_email,
      password: await bcryptjs.hash(password, 10),
      company_area,
      admin_role,
    });
  }

  async registerAdmin({
    name,
    last_name,
    admin_gender,
    admin_id_type,
    id_number,
    corporate_email,
    password,
    company_area,
    admin_role,
  }: CreateAdminDto) {
    await this.adminsService.getAdminByIdNumber(id_number);

    return await this.adminsService.createAdmin({
      name,
      last_name,
      admin_gender,
      admin_id_type,
      id_number,
      corporate_email,
      password: await bcryptjs.hash(password, 10),
      company_area,
      admin_role,
    });
  }

  async registerUserPerson({
    name,
    last_name,
    user_gender,
    birthay_date,
    user_id_type,
    id_number,
    id_exp_date,
    email,
    cellphone,
    password,
    residence_department,
    residence_city,
    residence_address,
    residence_neighborhood,
    user_role,
  }: CreateUserPersonDto) {
    await this.usersService.getUsersByIdNumber(id_number);

    return await this.usersService.createUserPerson({
      name,
      last_name,
      user_gender,
      birthay_date,
      user_id_type,
      id_number,
      id_exp_date,
      email,
      cellphone,
      password: await bcryptjs.hash(password, 10),
      residence_department,
      residence_city,
      residence_address,
      residence_neighborhood,
      user_role,
    });
  }

  async registerUserEps({
    name,
    last_name,
    user_gender,
    user_id_type,
    id_number,
    eps_company,
    company_area,
    email,
    password,
    user_role,
  }: CreateUserEpsDto) {
    await this.usersService.getUsersByIdNumber(id_number);

    return await this.usersService.createUserEps({
      name,
      last_name,
      user_gender,
      user_id_type,
      id_number,
      eps_company,
      company_area,
      email,
      password: await bcryptjs.hash(password, 10),
      user_role,
    });
  }

  // LOGIN FUNTIONS //

  async loginUsers({ id_number, password }: LoginDto) {
    const userFound =
      await this.usersService.getUserFoundByIdNumberWithPassword(id_number);

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
      await this.adminsService.getAdminFoundByIdNumberWithPassword(id_number);

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
