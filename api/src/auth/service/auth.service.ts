import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminsService } from '../../admins/services/admins.service';
import { UsersService } from '../../users/services/users.service';
import { AuthorizedFamiliarService } from '../../authorized_familiar/services/authorized_familiar.service';
import { CreateSuperAdminDto } from '../../admins/dto/create_super_admin.dto';
import { CreateAdminDto } from '../../admins/dto/create_admin.dto';
import { CreateUserPatientDto } from '../../users/dto/create_user_patient.dto';
import { CreateAuthorizedFamiliarDto } from '../../authorized_familiar/dto/create-authorized_familiar.dto';
import { CreateUserEpsDto } from '../../users/dto/create_user_eps.dto';
import { User } from '../../users/entities/user.entity';
import { LoginDto } from '../dto/login.dto';
import { AuthorizedFamiliar } from '../../authorized_familiar/entities/authorized_familiar.entity';
import { FamiliarLoginDto } from '../dto/familiar_login.dto';
import { SendEmailDto } from '../../nodemailer/dto/send_email.dto';
import { NodemailerService } from '../../nodemailer/services/nodemailer.service';
import {
  EMAIL_VERIFICATION_CODE,
  SUBJECT_EMAIL_VERIFICATION_CODE,
} from '../../nodemailer/constants/email_config.constant';

import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs';
import { UUID } from 'crypto';

const schedule = require('node-schedule');

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(AuthorizedFamiliar)
    private familiarRepository: Repository<AuthorizedFamiliar>,
    private readonly adminsService: AdminsService,
    private readonly usersService: UsersService,
    private readonly familiarService: AuthorizedFamiliarService,
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

  async registerUserPatient({
    name,
    last_name,
    user_gender,
    birthdate,
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
  }: CreateUserPatientDto) {
    await this.usersService.getUsersByIdNumber(id_number);

    return await this.usersService.createUserPatient({
      name,
      last_name,
      user_gender,
      birthdate,
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

  async registerFamiliar(
    userId: string,
    {
      name,
      last_name,
      user_id_type,
      id_number,
      email,
      cellphone,
      user_gender,
      rel_with_patient,
      user_role,
      verification_code,
    }: CreateAuthorizedFamiliarDto,
  ) {
    await this.familiarService.getFamiliarByIdNumber(id_number);

    return await this.familiarService.createUserFamiliar(userId, {
      name,
      last_name,
      user_id_type,
      id_number,
      email,
      cellphone,
      user_gender,
      rel_with_patient,
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
      throw new UnauthorizedException(`¡Datos ingresados incorrectos!`);
    }

    const isCorrectPassword = await bcryptjs.compare(
      password,
      userFound.password,
    );

    if (!isCorrectPassword) {
      throw new UnauthorizedException(`¡Contraseña incorrecta!`);
    }

    const verificationCode = Math.floor(1000 + Math.random() * 9999);

    await this.userRepository.update(
      {
        id: userFound.id,
      },
      { verification_code: verificationCode },
    );

    const userWithCode = await this.userRepository.findOne({
      where: {
        id: userFound.id,
      },
    });

    const emailDetailsToSend = new SendEmailDto();

    emailDetailsToSend.recipients = [userFound.email];
    emailDetailsToSend.userName = userFound.name;
    emailDetailsToSend.subject = SUBJECT_EMAIL_VERIFICATION_CODE;
    emailDetailsToSend.emailTemplate = EMAIL_VERIFICATION_CODE;
    emailDetailsToSend.verificationCode = userWithCode.verification_code;

    await this.nodemailerService.sendEmail(emailDetailsToSend);

    schedule.scheduleJob(new Date(Date.now() + 5 * 60 * 1000), async () => {
      await this.userRepository.update(
        {
          id: userFound.id,
        },
        { verification_code: null },
      );
    });

    return { id_type, id_number };
  }

  async loginRelatives({
    id_type,
    id_number,
    email,
    patient_id_number,
    rel_with_patient,
  }: FamiliarLoginDto) {
    const familiarFound = await this.familiarService.getFamiliarWithPatient(
      id_type,
      id_number,
      email,
      patient_id_number,
      rel_with_patient,
    );

    if (!familiarFound) {
      throw new UnauthorizedException(`¡Datos de ingreso incorrectos!`);
    }

    const patientOfFamiliar = await this.userRepository.findOne({
      where: {
        id: familiarFound.patient_id,
      },
    });

    const familiarVerified = await this.familiarRepository.findOne({
      where: {
        user_id_type: id_type,
        id_number: id_number,
        email: email,
        patient_id: patientOfFamiliar.id,
      },
      select: ['id', 'name', 'user_id_type', 'id_number', 'email', 'role'],
    });

    const verificationCode = Math.floor(1000 + Math.random() * 9999);

    await this.familiarRepository.update(
      {
        id: familiarVerified.id,
      },
      { verification_code: verificationCode },
    );

    const familiarWithCode = await this.familiarRepository.findOne({
      where: {
        id: familiarVerified.id,
      },
    });

    const emailDetailsToSend = new SendEmailDto();

    emailDetailsToSend.recipients = [familiarVerified.email];
    emailDetailsToSend.userName = familiarVerified.name;
    emailDetailsToSend.subject = SUBJECT_EMAIL_VERIFICATION_CODE;
    emailDetailsToSend.emailTemplate = EMAIL_VERIFICATION_CODE;
    emailDetailsToSend.verificationCode = familiarWithCode.verification_code;

    await this.nodemailerService.sendEmail(emailDetailsToSend);

    schedule.scheduleJob(new Date(Date.now() + 5 * 60 * 1000), async () => {
      await this.familiarRepository.update(
        {
          id: familiarVerified.id,
        },
        { verification_code: null },
      );
    });

    return { id_type, id_number, email, patient_id_number };
  }

  async verifyCodeAndLoginUsers(idNumber: number, verification_code: number) {
    const userFound = await this.usersService.getUserFoundByIdAndCode(
      idNumber,
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

    await this.userRepository.update(
      {
        id: userFound.id,
      },
      { verification_code: null },
    );

    return {
      token,
      id_type: userFound.user_id_type,
      id_number: userFound.id_number,
    };
  }

  async verifyCodeAndLoginRelatives(
    idNumber: number,
    verification_code: number,
  ) {
    const familiarFound =
      await this.familiarService.getFamiliarFoundByIdAndCode(
        idNumber,
        verification_code,
      );

    if (!familiarFound) {
      throw new UnauthorizedException(`¡Código de verificación incorrecto!`);
    }

    const payload = {
      id_type: familiarFound.user_id_type,
      id_number: familiarFound.id_number,
      role: familiarFound.role,
    };

    const token = await this.jwtService.signAsync(payload);

    await this.familiarRepository.update(
      {
        id: familiarFound.id,
      },
      { verification_code: null },
    );

    return {
      token,
      id_type: familiarFound.user_id_type,
      id_number: familiarFound.id_number,
      patientIdNumber: familiarFound.patient_id,
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
