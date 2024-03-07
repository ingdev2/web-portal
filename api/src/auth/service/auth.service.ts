import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminsService } from '../../admins/services/admins.service';
import { UsersService } from '../../users/services/users.service';
import { CreateSuperAdminDto } from '../../admins/dto/create_super_admin.dto';
import { CreateAdminDto } from '../../admins/dto/create_admin.dto';
import { CreateUserPersonDto } from '../../users/dto/create_user_person.dto';
import { CreateUserEpsDto } from '../../users/dto/create_user_eps.dto';
import { User } from 'src/users/entities/user.entity';
import { LoginDto } from '../dto/login.dto';
import { SendEmailDto } from 'src/nodemailer/dto/send_email.dto';
import { NodemailerService } from 'src/nodemailer/services/nodemailer.service';
import {
  EMAIL_VERIFICATION_CODE,
  SUBJECT_EMAIL_VERIFICATION_CODE,
} from 'src/nodemailer/constants/email_config.constant';
import { JwtService } from '@nestjs/jwt';

import * as bcryptjs from 'bcryptjs';

const schedule = require('node-schedule');

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly adminsService: AdminsService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly nodemailerService: NodemailerService,
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
    email,
    cellphone,
    password,
    residence_department,
    residence_city,
    residence_address,
    residence_neighborhood,
    user_role,
    verification_code,
  }: CreateUserPersonDto) {
    await this.usersService.getUsersByIdNumber(id_number);

    return await this.usersService.createUserPerson({
      name,
      last_name,
      user_gender,
      birthay_date,
      user_id_type,
      id_number,
      email,
      cellphone,
      password: await bcryptjs.hash(password, 10),
      residence_department,
      residence_city,
      residence_address,
      residence_neighborhood,
      user_role,
      verification_code,
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
    cellphone,
    password,
    user_role,
    verification_code,
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
      cellphone,
      password: await bcryptjs.hash(password, 10),
      user_role,
      verification_code,
    });
  }

  // LOGIN FUNTIONS //

  async loginAdmins({ id_type, id_number, password }: LoginDto) {
    const adminFound =
      await this.adminsService.getAdminFoundByIdNumberWithPassword(
        id_type,
        id_number,
      );

    if (!adminFound) {
      throw new UnauthorizedException(
        `¡El número de identificación es incorrecto!`,
      );
    }

    const isCorrectPassword = await bcryptjs.compare(
      password,
      adminFound.password,
    );

    if (!isCorrectPassword) {
      throw new UnauthorizedException(`¡Contraseña incorrecta!`);
    }

    const payload = {
      id_number: adminFound.id_number,
      role: adminFound.role,
    };

    const token = await this.jwtService.signAsync(payload);

    return { token, id_number };
  }

  async loginUsers({ id_type, id_number, password }: LoginDto) {
    const userFound =
      await this.usersService.getUserFoundByIdNumberWithPassword(
        id_type,
        id_number,
      );

    if (!userFound) {
      throw new UnauthorizedException(
        `¡El tipo o número de identificación es incorrecto!`,
      );
    }

    const isCorrectPassword = await bcryptjs.compare(
      password,
      userFound.password,
    );

    if (!isCorrectPassword) {
      throw new UnauthorizedException(`¡Contraseña incorrecta!`);
    }

    const verificationCode = Math.floor(1000 + Math.random() * 9999);

    userFound.verification_code = verificationCode;

    await this.userRepository.save(userFound);

    const emailDetailsToSend = new SendEmailDto();

    emailDetailsToSend.recipients = [userFound.email];
    emailDetailsToSend.userName = userFound.name;
    emailDetailsToSend.subject = SUBJECT_EMAIL_VERIFICATION_CODE;
    emailDetailsToSend.emailTemplate = EMAIL_VERIFICATION_CODE;
    emailDetailsToSend.verificationCode = userFound.verification_code;

    await this.nodemailerService.sendEmail(emailDetailsToSend);

    schedule.scheduleJob(new Date(Date.now() + 5 * 60 * 1000), async () => {
      userFound.verification_code = null;
      await this.userRepository.save(userFound);
    });

    return { id_type, id_number };
  }

  async verifyCodeAndLoginUsers(id: string, verification_code: number) {
    const userFound = await this.usersService.getUserFoundByIdAndCode(
      id,
      verification_code,
    );

    if (!userFound) {
      throw new UnauthorizedException(`¡Código de verificación incorrecto!`);
    }

    const payload = {
      id_type: userFound.user_id_type,
      id_number: userFound.id_number,
      role: userFound.role,
    };

    const token = await this.jwtService.signAsync(payload);

    userFound.verification_code = null;
    await this.userRepository.save(userFound);

    return {
      token,
      id_type: userFound.user_id_type,
      id_number: userFound.id_number,
    };
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
