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
import { AuthorizedFamiliarService } from '../../authorized_familiar/services/authorized_familiar.service';
import { AuthenticationMethod } from '../../authentication_method/entities/authentication_method.entity';
import { AuthenticationMethodEnum } from '../../utils/enums/authentication_method.enum';
import { CreateSuperAdminDto } from '../../admins/dto/create_super_admin.dto';
import { CreateAdminDto } from '../../admins/dto/create_admin.dto';
import { CreateUserPatientDto } from '../../users/dto/create_user_patient.dto';
import { CreateAuthorizedFamiliarDto } from '../../authorized_familiar/dto/create-authorized_familiar.dto';
import { CreateUserEpsDto } from '../../users/dto/create_user_eps.dto';
import { User } from '../../users/entities/user.entity';
import { UserRole } from '../../user_roles/entities/user_role.entity';
import { UserRolType } from '../../utils/enums/user_roles.enum';
import { LoginDto } from '../dto/login.dto';
import { ValidatePatientDto } from '../../users/dto/validate_patient.dto';
import axios from 'axios';
import { IdTypeAbbrev } from '../../users/enums/id_type_abbrev.enum';
import { IdType } from '../../utils/enums/id_type.enum';
import { IdTypeEntity } from '../../id_types/entities/id_type.entity';
import { AuthorizedFamiliar } from '../../authorized_familiar/entities/authorized_familiar.entity';
import { FamiliarLoginDto } from '../dto/familiar_login.dto';
import { IdNumberDto } from '../dto/id_number.dto';
import { SendEmailDto } from '../../nodemailer/dto/send_email.dto';
import { NodemailerService } from '../../nodemailer/services/nodemailer.service';
import {
  EMAIL_VERIFICATION_CODE,
  SUBJECT_EMAIL_VERIFICATION_CODE,
} from '../../nodemailer/constants/email_config.constant';

import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs';

const schedule = require('node-schedule');

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(IdTypeEntity)
    private idTypeRepository: Repository<IdTypeEntity>,

    @InjectRepository(AuthorizedFamiliar)
    private familiarRepository: Repository<AuthorizedFamiliar>,

    @InjectRepository(UserRole)
    private userRoleRepository: Repository<UserRole>,

    @InjectRepository(AuthenticationMethod)
    private authenticationMethodRepository: Repository<AuthenticationMethod>,

    private readonly adminsService: AdminsService,
    private readonly usersService: UsersService,
    private readonly familiarService: AuthorizedFamiliarService,
    private readonly jwtService: JwtService,
    private readonly nodemailerService: NodemailerService,
  ) {}

  // VALIDATE PATIENT //

  async validateThatThePatientExist({
    idType,
    idNumber,
  }: ValidatePatientDto): Promise<any[]> {
    try {
      const AUTH_VALUE = process.env.X_AUTH_VALUE;

      const response = await axios.get(
        `https://apitorrecontrol.bonnadona.net/api_torre_control/hosvital/paciente/path/${idNumber}/${idType}`,
        {
          headers: {
            'X-Authorization': AUTH_VALUE,
          },
        },
      );

      const allData = response.data;

      const idTypeAbbrev = allData.data[0]?.TIPO;

      const idTypeAbbreviations: Record<IdTypeAbbrev, IdType> = {
        [IdTypeAbbrev.CÉDULA_DE_CIUDADANÍA]: IdType.CITIZENSHIP_CARD,
        [IdTypeAbbrev.CÉDULA_DE_EXTRANJERÍA]: IdType.FOREIGNER_ID,
        [IdTypeAbbrev.TARJETA_DE_IDENTIDAD]: IdType.IDENTITY_CARD,
        [IdTypeAbbrev.REGISTRO_CIVIL]: IdType.CIVIL_REGISTRATION,
        [IdTypeAbbrev.PASAPORTE]: IdType.PASSPORT,
        [IdTypeAbbrev.PERMISO_ESPECIAL_PERMANENCIA]:
          IdType.SPECIAL_RESIDENCE_PERMIT,
        [IdTypeAbbrev.PERMISO_PROTECCIÓN_TEMPORAL]:
          IdType.TEMPORARY_PROTECTION_PERMIT,
        [IdTypeAbbrev.MENOR_SIN_IDENTIFICACIÓN]:
          IdType.MINOR_WITHOUT_IDENTIFICATION,
        [IdTypeAbbrev.MAYOR_SIN_IDENTIFICACIÓN]:
          IdType.ADULT_WITHOUT_IDENTIFICATION,
      };

      const idTypeNumberForInsert = idTypeAbbreviations[idTypeAbbrev];

      const idTypeOfUserIdNumber = await this.idTypeRepository.findOne({
        where: {
          name: idTypeNumberForInsert,
        },
      });

      const idTypeId = idTypeOfUserIdNumber.id;

      return [allData, { 'Número de ID de tipo de documento': idTypeId }];
    } catch (error) {
      throw new HttpException(
        'Hubo un error al consultar en la base de datos.',
        HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      );
    }
  }

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
    position_level,
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
      position_level,
      admin_role,
    });
  }

  async validatePatientRegister({ id_number }: IdNumberDto) {
    const patientUserFound = await this.userRepository.findOne({
      where: { id_number: id_number },
    });

    if (patientUserFound) {
      return new HttpException(
        `¡El paciente ya tiene cuenta creada!`,
        HttpStatus.CONFLICT,
      );
    } else {
      return new HttpException(
        `¡El paciente no tiene cuenta creada!`,
        HttpStatus.OK,
      );
    }
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
    whatsapp,
    password,
    authentication_method,
    affiliation_eps,
    residence_department,
    residence_city,
    residence_address,
    residence_neighborhood,
    user_role,
    verification_code,
  }: CreateUserPatientDto) {
    await this.usersService.getPatientUserByIdNumber(id_number);

    return await this.usersService.createUserPatient({
      name,
      last_name,
      user_gender,
      birthdate,
      user_id_type,
      id_number,
      email,
      cellphone,
      whatsapp,
      authentication_method,
      affiliation_eps,
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
      whatsapp,
      user_gender,
      rel_with_patient,
      user_role,
      authentication_method,
      verification_code,
    }: CreateAuthorizedFamiliarDto,
  ) {
    await this.familiarService.getFamiliarCompleteByIdNumber(id_number);

    return await this.familiarService.createUserFamiliar(userId, {
      name,
      last_name,
      user_id_type,
      id_number,
      email,
      cellphone,
      whatsapp,
      user_gender,
      rel_with_patient,
      user_role,
      authentication_method,
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
    authentication_method,
    user_role,
    verification_code,
  }: CreateUserEpsDto) {
    await this.usersService.getEpsUserByIdNumber(id_number);

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
      authentication_method,
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

  async loginPatientUsers({ id_type, id_number, password }: LoginDto) {
    const patientUserRoleFound = await this.userRoleRepository.findOne({
      where: { name: UserRolType.PATIENT },
    });

    if (!patientUserRoleFound) {
      throw new UnauthorizedException(`¡Role de usuario no encontrado!`);
    }

    const userFound =
      await this.usersService.getUserFoundByIdNumberWithPassword(
        id_type,
        id_number,
      );

    if (!userFound) {
      throw new UnauthorizedException(`¡Datos ingresados incorrectos!`);
    }

    const verifiedPatientUserRole = await this.userRepository.findOne({
      where: {
        id_number: id_number,
        user_role: patientUserRoleFound.id,
      },
    });

    if (!verifiedPatientUserRole) {
      throw new UnauthorizedException(`¡Usuario no autorizado!`);
    }

    const isCorrectPassword = await bcryptjs.compare(
      password,
      userFound.password,
    );

    if (!isCorrectPassword) {
      throw new UnauthorizedException(`¡Datos ingresados incorrectos!`);
    }

    const verificationCode = Math.floor(1000 + Math.random() * 9999);

    await this.userRepository.update(
      {
        id: userFound.id,
      },
      { verification_code: verificationCode },
    );

    const authenticationMethodEmailFound =
      await this.authenticationMethodRepository.findOne({
        where: {
          name: AuthenticationMethodEnum.EMAIL,
        },
      });

    const authenticationMethodCellphoneFound =
      await this.authenticationMethodRepository.findOne({
        where: {
          name: AuthenticationMethodEnum.CELLPHONE,
        },
      });

    if (!authenticationMethodEmailFound) {
      return new UnauthorizedException(
        `El método de autenticación "Email" no existe.`,
      );
    }

    if (!authenticationMethodCellphoneFound) {
      return new UnauthorizedException(
        `El método de autenticación "Célular" no existe.`,
      );
    }

    if (userFound.authentication_method === authenticationMethodEmailFound.id) {
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
          { id: userFound.id },
          { verification_code: null },
        );
      });
    }

    if (
      userFound.authentication_method === authenticationMethodCellphoneFound.id
    ) {
      // TODO: IMPLEMENTAR ENVIO DE CÓDIGO POR MENSAJE DE TEXTO
    }

    return { id_type, id_number };
  }

  async loginEpsUsers({ id_type, id_number, password }: LoginDto) {
    const epsUserRoleFound = await this.userRoleRepository.findOne({
      where: { name: UserRolType.EPS },
    });

    if (!epsUserRoleFound) {
      throw new UnauthorizedException(`¡Role de usuario no encontrado!`);
    }

    const userFound =
      await this.usersService.getUserFoundByIdNumberWithPassword(
        id_type,
        id_number,
      );

    if (!userFound) {
      throw new UnauthorizedException(`¡Datos ingresados incorrectos!`);
    }

    const verifiedEpsUserRole = await this.userRepository.findOne({
      where: {
        id_number: id_number,
        user_role: epsUserRoleFound.id,
      },
    });

    if (!verifiedEpsUserRole) {
      throw new UnauthorizedException(`¡Usuario no autorizado!`);
    }

    const isCorrectPassword = await bcryptjs.compare(
      password,
      userFound.password,
    );

    if (!isCorrectPassword) {
      throw new UnauthorizedException(`¡Datos ingresados incorrectos!`);
    }

    const verificationCode = Math.floor(1000 + Math.random() * 9999);

    await this.userRepository.update(
      {
        id: userFound.id,
      },
      { verification_code: verificationCode },
    );

    const authenticationMethodEmailFound =
      await this.authenticationMethodRepository.findOne({
        where: {
          name: AuthenticationMethodEnum.EMAIL,
        },
      });

    const authenticationMethodCellphoneFound =
      await this.authenticationMethodRepository.findOne({
        where: {
          name: AuthenticationMethodEnum.CELLPHONE,
        },
      });

    if (!authenticationMethodEmailFound) {
      return new UnauthorizedException(
        `El método de autenticación "Email" no existe.`,
      );
    }

    if (!authenticationMethodCellphoneFound) {
      return new UnauthorizedException(
        `El método de autenticación "Célular" no existe.`,
      );
    }

    if (userFound.authentication_method === authenticationMethodEmailFound.id) {
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
          { id: userFound.id },
          { verification_code: null },
        );
      });
    }

    if (
      userFound.authentication_method === authenticationMethodCellphoneFound.id
    ) {
      // TODO: IMPLEMENTAR ENVIO DE CÓDIGO POR MENSAJE DE TEXTO
    }

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

    const familiarUserRoleFound = await this.userRoleRepository.findOne({
      where: { name: UserRolType.AUTHORIZED_FAMILIAR },
    });

    if (!familiarUserRoleFound) {
      throw new UnauthorizedException(`¡Role de usuario no encontrado!`);
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
        user_role: familiarUserRoleFound.id,
      },
      select: ['id', 'name', 'user_id_type', 'id_number', 'email', 'role'],
    });

    if (!familiarVerified) {
      throw new UnauthorizedException(`¡Usuario no autorizado!`);
    }

    const verificationCode = Math.floor(1000 + Math.random() * 9999);

    await this.familiarRepository.update(
      {
        id: familiarVerified.id,
      },
      { verification_code: verificationCode },
    );

    const authenticationMethodEmailFound =
      await this.authenticationMethodRepository.findOne({
        where: {
          name: AuthenticationMethodEnum.EMAIL,
        },
      });

    const authenticationMethodCellphoneFound =
      await this.authenticationMethodRepository.findOne({
        where: {
          name: AuthenticationMethodEnum.CELLPHONE,
        },
      });

    if (!authenticationMethodEmailFound) {
      return new UnauthorizedException(
        `El método de autenticación "Email" no existe.`,
      );
    }

    if (!authenticationMethodCellphoneFound) {
      return new UnauthorizedException(
        `El método de autenticación "Célular" no existe.`,
      );
    }

    if (
      familiarVerified.authentication_method ===
      authenticationMethodEmailFound.id
    ) {
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
    }

    if (
      familiarVerified.authentication_method ===
      authenticationMethodCellphoneFound.id
    ) {
      // TODO: IMPLEMENTAR ENVIO DE CÓDIGO POR MENSAJE DE TEXTO
    }

    return { id_type, id_number, email, patient_id_number };
  }

  async resendVerificationUserCode({ id_type, id_number }: LoginDto) {
    const userFound = await this.usersService.getUserFoundByIdNumber(id_number);

    if (!userFound) {
      throw new UnauthorizedException(`Usuario no encontrado`);
    }

    const verificationCode = Math.floor(1000 + Math.random() * 9999);

    await this.userRepository.update(
      { id: userFound.id },
      { verification_code: verificationCode },
    );

    const userWithCode = await this.userRepository.findOne({
      where: { id: userFound.id },
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
        { id: userFound.id },
        { verification_code: null },
      );
    });

    return { id_type, id_number };
  }

  async resendVerificationFamiliarCode({
    id_type,
    id_number,
    email,
  }: FamiliarLoginDto) {
    const familiarFound =
      await this.familiarService.getFamiliarFoundByIdNumber(id_number);

    if (!familiarFound) {
      throw new UnauthorizedException(`Familiar no encontrado`);
    }

    const familiarVerifiedFound = await this.familiarRepository.findOne({
      where: {
        user_id_type: id_type,
        id_number: id_number,
        email: email,
        rel_with_patient: familiarFound.rel_with_patient,
      },
    });

    if (!familiarVerifiedFound) {
      throw new UnauthorizedException(`Familiar no verificado`);
    }

    const verificationCode = Math.floor(1000 + Math.random() * 9999);

    await this.familiarRepository.update(
      { id: familiarVerifiedFound.id },
      { verification_code: verificationCode },
    );

    const familiarWithCode = await this.familiarRepository.findOne({
      where: { id: familiarVerifiedFound.id },
    });

    const emailDetailsToSend = new SendEmailDto();
    emailDetailsToSend.recipients = [familiarFound.email];
    emailDetailsToSend.userName = familiarFound.name;
    emailDetailsToSend.subject = SUBJECT_EMAIL_VERIFICATION_CODE;
    emailDetailsToSend.emailTemplate = EMAIL_VERIFICATION_CODE;
    emailDetailsToSend.verificationCode = familiarWithCode.verification_code;

    await this.nodemailerService.sendEmail(emailDetailsToSend);

    schedule.scheduleJob(new Date(Date.now() + 5 * 60 * 1000), async () => {
      await this.familiarRepository.update(
        { id: familiarFound.id },
        { verification_code: null },
      );
    });

    return { id_type, id_number };
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
