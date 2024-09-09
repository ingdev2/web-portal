import {
  Injectable,
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { AuthorizedFamiliar } from '../../authorized_familiar/entities/authorized_familiar.entity';
import { EpsCompany } from 'src/eps_company/entities/eps_company.entity';
import { UserRole } from '../../user_roles/entities/user_role.entity';
import { UserRolType } from '../../utils/enums/user_roles.enum';
import { IdTypeEntity } from '../../id_types/entities/id_type.entity';
import { IdType } from '../../utils/enums/id_type.enum';
import { IdTypeAbbrev } from '../enums/id_type_abbrev.enum';
import { GenderType } from '../../genders/entities/gender.entity';
import { Gender } from '../../utils/enums/gender.enum';
import { AuthenticationMethod } from '../../authentication_method/entities/authentication_method.entity';
import { AuthenticationMethodEnum } from '../../utils/enums/authentication_method.enum';
import { DeptsAndCitiesService } from '../../depts_and_cities/services/depts_and_cities.service';
import { CreateUserPatientDto } from '../dto/create_user_patient.dto';
import { UpdateUserPatientDto } from '../dto/update_user_patient.dto';
import { CreateUserEpsDto } from '../dto/create_user_eps.dto';
import { UpdateUserEpsDto } from '../dto/update_user_eps.dto';
import { UpdatePasswordUserDto } from '../dto/update_password_user.dto';
import { ForgotPasswordUserPatientDto } from '../dto/forgot_password_user_patient.dto';
import { ForgotPasswordUserEpsDto } from '../dto/forgot_password_user_eps.dto';
import { ResetPasswordUserDto } from '../dto/reset_password_user.dto';
import { ValidatePatientDto } from '../dto/validate_patient.dto';
import { nanoid } from 'nanoid';
import { validateCorporateEmail } from 'src/eps_company/helpers/validate_corporate_email';
import { NodemailerService } from '../../nodemailer/services/nodemailer.service';
import { SendEmailDto } from 'src/nodemailer/dto/send_email.dto';
import {
  ACCOUNT_CREATED,
  USER_CREATION_NOTIFICATION_TO_EPS,
  PASSWORD_RESET,
  RESET_PASSWORD_TEMPLATE,
  SUBJECT_ACCOUNT_CREATED,
  SUBJECT_USER_CREATION_NOTIFICATION_TO_EPS,
  PASSWORD_UPDATED,
  UPDATED_PASSWORD_TEMPLATE,
} from 'src/nodemailer/constants/email_config.constant';

import * as bcryptjs from 'bcryptjs';
import axios from 'axios';
import { CONTACT_PBX } from 'src/utils/constants/constants';
import { maskEmailUser } from '../helpers/mask_email';

const schedule = require('node-schedule');

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,

    @InjectRepository(EpsCompany)
    private epsCompanyRepository: Repository<EpsCompany>,

    @InjectRepository(AuthorizedFamiliar)
    private familiarRepository: Repository<AuthorizedFamiliar>,

    @InjectRepository(UserRole)
    private userRoleRepository: Repository<UserRole>,

    @InjectRepository(IdTypeEntity)
    private idTypeRepository: Repository<IdTypeEntity>,

    @InjectRepository(GenderType)
    private genderRepository: Repository<GenderType>,

    @InjectRepository(AuthenticationMethod)
    private authenticationMethodRepository: Repository<AuthenticationMethod>,

    private readonly nodemailerService: NodemailerService,
  ) {}

  // CREATE FUNTIONS //

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

  transformIdTypeName(idTypeAbbrev: string): IdType {
    const abbreviatedId = idTypeAbbrev;

    const idTypeAbbrevValues = Object.values(IdTypeAbbrev);

    switch (abbreviatedId) {
      case idTypeAbbrevValues[0]:
        return IdType.CITIZENSHIP_CARD;
      case idTypeAbbrevValues[1]:
        return IdType.FOREIGNER_ID;
      case idTypeAbbrevValues[2]:
        return IdType.IDENTITY_CARD;
      case idTypeAbbrevValues[3]:
        return IdType.CIVIL_REGISTRATION;
      case idTypeAbbrevValues[4]:
        return IdType.PASSPORT;
      case idTypeAbbrevValues[5]:
        return IdType.SPECIAL_RESIDENCE_PERMIT;
      case idTypeAbbrevValues[6]:
        return IdType.TEMPORARY_PROTECTION_PERMIT;
      case idTypeAbbrevValues[7]:
        return IdType.MINOR_WITHOUT_IDENTIFICATION;
      case idTypeAbbrevValues[8]:
        return IdType.ADULT_WITHOUT_IDENTIFICATION;
      default:
        throw new HttpException(
          `Tipo de identificación ingresado no válido.`,
          HttpStatus.CONFLICT,
        );
    }
  }

  async transformIdTypeNumber(idTypeName: string): Promise<number> {
    const idTypeNameString = this.transformIdTypeName(idTypeName);

    const idTypeOfUser = await this.idTypeRepository.findOne({
      where: {
        name: idTypeNameString,
      },
    });

    if (!idTypeOfUser) {
      throw new HttpException(
        `Tipo de identificación no encontrado.`,
        HttpStatus.NOT_FOUND,
      );
    }

    const idTypeId = idTypeOfUser.id;

    return idTypeId;
  }

  transformGenderName(genderAbbrev: string): Gender {
    const abbreviatedId = genderAbbrev;

    switch (abbreviatedId) {
      case 'M':
        return Gender.MALE;
      case 'F':
        return Gender.FEMALE;
      default:
        throw new HttpException(
          `Tipo de sexo ingresado no válido.`,
          HttpStatus.CONFLICT,
        );
    }
  }

  async transformGenderNumber(genderName: string): Promise<number> {
    const genderNameString = this.transformGenderName(genderName);

    const genderOfUser = await this.genderRepository.findOne({
      where: {
        name: genderNameString,
      },
    });

    if (!genderOfUser) {
      throw new HttpException(
        `Tipo de sexo no encontrado.`,
        HttpStatus.NOT_FOUND,
      );
    }

    const idTypeId = genderOfUser.id;

    return idTypeId;
  }

  async createUserPatient(userPatient: CreateUserPatientDto) {
    const idTypeOfUser = await this.idTypeRepository.findOne({
      where: {
        id: userPatient.user_id_type,
      },
    });

    const idTypeName = idTypeOfUser.name;

    const idTypeAbbreviations: Record<string, string> = {
      [IdType.CITIZENSHIP_CARD]: IdTypeAbbrev.CÉDULA_DE_CIUDADANÍA,
      [IdType.FOREIGNER_ID]: IdTypeAbbrev.CÉDULA_DE_EXTRANJERÍA,
      [IdType.IDENTITY_CARD]: IdTypeAbbrev.TARJETA_DE_IDENTIDAD,
      [IdType.CIVIL_REGISTRATION]: IdTypeAbbrev.REGISTRO_CIVIL,
      [IdType.PASSPORT]: IdTypeAbbrev.PASAPORTE,
      [IdType.SPECIAL_RESIDENCE_PERMIT]:
        IdTypeAbbrev.PERMISO_ESPECIAL_PERMANENCIA,
      [IdType.TEMPORARY_PROTECTION_PERMIT]:
        IdTypeAbbrev.PERMISO_PROTECCIÓN_TEMPORAL,
      [IdType.MINOR_WITHOUT_IDENTIFICATION]:
        IdTypeAbbrev.MENOR_SIN_IDENTIFICACIÓN,
      [IdType.ADULT_WITHOUT_IDENTIFICATION]:
        IdTypeAbbrev.MAYOR_SIN_IDENTIFICACIÓN,
    };

    const idTypeNameForConsult = idTypeAbbreviations[idTypeName] || '';

    const data = await this.validateThatThePatientExist({
      idType: idTypeNameForConsult,
      idNumber: userPatient.id_number,
    });

    const patientData = data[0]?.data;

    if (!patientData || patientData.length === 0) {
      return new HttpException(
        `El paciente con número de identificación ${userPatient.id_number} no esta registrado en la base de datos de la clínica.`,
        HttpStatus.CONFLICT,
      );
    }

    userPatient.name = patientData[0]?.NOMBRE;
    userPatient.birthdate = patientData[0]?.FECHA_NACIMIENTO;
    userPatient.email = patientData[0]?.CORREO;
    userPatient.cellphone = patientData[0]?.CELULAR;
    userPatient.affiliation_eps = patientData[0]?.EMPRESA;
    userPatient.residence_address = patientData[0]?.DIRECCION;

    const userPatientFound = await this.userRepository.findOne({
      where: {
        id_number: userPatient.id_number,
      },
    });

    if (userPatientFound) {
      return new HttpException(
        `El usuario con número de identificación ${userPatient.id_number} ya está registrado.`,
        HttpStatus.CONFLICT,
      );
    }

    // const authenticationMethodFound =
    //   await this.authenticationMethodRepository.findOne({
    //     where: {
    //       id: userPatient.authentication_method,
    //     },
    //   });

    // if (!authenticationMethodFound) {
    //   return new HttpException(
    //     `El método de autenticación ingresado no es válido.`,
    //     HttpStatus.CONFLICT,
    //   );
    // }

    const userPatientEmailFound = await this.userRepository.findOne({
      where: {
        email: userPatient.email,
      },
    });

    const userFamiliarEmailFound = await this.familiarRepository.findOne({
      where: {
        email: userPatient.email,
      },
    });

    if (userPatientEmailFound || userFamiliarEmailFound) {
      return new HttpException(
        `El correo electrónico ${userPatient.email} ya está registrado.`,
        HttpStatus.CONFLICT,
      );
    }

    const userPatientCellphoneFound = await this.userRepository.findOne({
      where: {
        cellphone: userPatient.cellphone,
      },
    });

    const userFamiliarCellphoneFound = await this.familiarRepository.findOne({
      where: {
        cellphone: userPatient.cellphone,
      },
    });

    if (userPatientCellphoneFound || userFamiliarCellphoneFound) {
      return new HttpException(
        `El número de celular ${userPatient.cellphone} ya está registrado.`,
        HttpStatus.CONFLICT,
      );
    }

    const rolePatientFound = await this.userRoleRepository.findOne({
      where: {
        name: UserRolType.PATIENT,
      },
    });

    if (!rolePatientFound) {
      throw new HttpException(
        'El rol "Paciente" no existe.',
        HttpStatus.NOT_FOUND,
      );
    }

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
      return new HttpException(
        `El método de autenticación "Email" no existe.`,
        HttpStatus.NOT_FOUND,
      );
    }

    if (!authenticationMethodCellphoneFound) {
      return new HttpException(
        `El método de autenticación "Célular" no existe.`,
        HttpStatus.NOT_FOUND,
      );
    }

    if (
      userPatient.authentication_method ===
        authenticationMethodCellphoneFound.id &&
      !userPatient.cellphone
    ) {
      return new HttpException(
        `Debe ingresar un número de celular para activar el método de autenticación seleccionado`,
        HttpStatus.CONFLICT,
      );
    }

    if (
      userPatient.authentication_method === authenticationMethodEmailFound.id &&
      !userPatient.email
    ) {
      return new HttpException(
        `Debe ingresar un correo electrónico para activar el método de autenticación seleccionado`,
        HttpStatus.CONFLICT,
      );
    }

    const insertRoleUserPatient = await this.userRepository.create({
      ...userPatient,
      user_role: rolePatientFound.id,
      authentication_method: authenticationMethodEmailFound.id,
      accept_terms: true,
    });

    const userPatientWithRole = await this.userRepository.save(
      insertRoleUserPatient,
    );

    const userRolePatient = await this.userRoleRepository.findOne({
      where: {
        id: userPatientWithRole.user_role,
        name: UserRolType.PATIENT,
      },
    });

    if (!userRolePatient) {
      throw new HttpException(
        'El usuario debe tener el rol "Paciente".',
        HttpStatus.CONFLICT,
      );
    }

    await this.userRepository.update(userPatientWithRole.id, userPatient);

    const newUserPatient = await this.userRepository.findOne({
      where: { id: userPatientWithRole.id },
    });

    const emailDetailsToSend = new SendEmailDto();

    emailDetailsToSend.recipients = [newUserPatient.email];
    emailDetailsToSend.userNameToEmail = newUserPatient.name;
    emailDetailsToSend.subject = SUBJECT_ACCOUNT_CREATED;
    emailDetailsToSend.emailTemplate = ACCOUNT_CREATED;
    emailDetailsToSend.portalWebUrl = process.env.PORTAL_WEB_URL;
    emailDetailsToSend.contactPbx = CONTACT_PBX;

    await this.nodemailerService.sendEmail(emailDetailsToSend);

    return newUserPatient;
  }

  async createUserEps(userEps: CreateUserEpsDto) {
    const userEpsFound = await this.userRepository.findOne({
      where: {
        id_number: userEps.id_number,
      },
    });

    if (userEpsFound) {
      return new HttpException(
        `El usuario con número de identificación ${userEps.id_number} ya está registrado.`,
        HttpStatus.CONFLICT,
      );
    }

    const userEpsEmailFound = await this.userRepository.findOne({
      where: {
        email: userEps.email,
      },
    });

    if (userEpsEmailFound) {
      return new HttpException(
        `El correo electrónico ${userEps.email} ya está registrado.`,
        HttpStatus.CONFLICT,
      );
    }

    const isCorporateEmail = await validateCorporateEmail(userEps.email);

    if (!isCorporateEmail) {
      throw new HttpException(
        `El email : ${userEps.email} no es un correo corporativo válido.`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const epsCompanyOfUserFound = await this.epsCompanyRepository.findOne({
      where: {
        id: userEps.eps_company,
      },
    });

    if (!epsCompanyOfUserFound) {
      return new HttpException(
        `La empresa EPS no existe.`,
        HttpStatus.CONFLICT,
      );
    }

    const authenticationEmailMethodFound =
      await this.authenticationMethodRepository.findOne({
        where: {
          name: AuthenticationMethodEnum.EMAIL,
        },
      });

    if (!authenticationEmailMethodFound) {
      return new HttpException(
        `El método de autenticación "Email" no existe.`,
        HttpStatus.NOT_FOUND,
      );
    }

    const roleEpsFound = await this.userRoleRepository.findOne({
      where: {
        name: UserRolType.EPS,
      },
    });

    if (!roleEpsFound) {
      throw new HttpException('El rol "Eps" no existe.', HttpStatus.NOT_FOUND);
    }

    const insertRoleUserEps = await this.userRepository.create({
      ...userEps,
      user_role: roleEpsFound.id,
      authentication_method: authenticationEmailMethodFound.id,
      accept_terms: true,
    });

    const userEpsWithRole = await this.userRepository.save(insertRoleUserEps);

    const userRoleEps = await this.userRoleRepository.findOne({
      where: {
        id: userEpsWithRole.user_role,
        name: UserRolType.EPS,
      },
    });

    if (!userRoleEps) {
      throw new HttpException(
        'El usuario debe tener el rol "Eps".',
        HttpStatus.CONFLICT,
      );
    }

    await this.userRepository.update(userEpsWithRole.id, userEps);

    const newUserEps = await this.userRepository.findOne({
      where: { id: userEpsWithRole.id },
    });

    const emailDetailsToSend = new SendEmailDto();

    emailDetailsToSend.recipients = [newUserEps.email];
    emailDetailsToSend.userNameToEmail = newUserEps.name;
    emailDetailsToSend.subject = SUBJECT_ACCOUNT_CREATED;
    emailDetailsToSend.emailTemplate = ACCOUNT_CREATED;
    emailDetailsToSend.portalWebUrl = process.env.PORTAL_WEB_URL;
    emailDetailsToSend.contactPbx = CONTACT_PBX;

    await this.nodemailerService.sendEmail(emailDetailsToSend);

    const emailUserCreationNotificationToSend = new SendEmailDto();

    emailUserCreationNotificationToSend.recipients = [
      epsCompanyOfUserFound.main_email,
    ];
    emailUserCreationNotificationToSend.userNameToEmail =
      epsCompanyOfUserFound.name;
    emailUserCreationNotificationToSend.subject =
      SUBJECT_USER_CREATION_NOTIFICATION_TO_EPS;
    emailUserCreationNotificationToSend.emailTemplate =
      USER_CREATION_NOTIFICATION_TO_EPS;
    emailUserCreationNotificationToSend.portalWebUrl =
      process.env.PORTAL_WEB_URL;
    emailUserCreationNotificationToSend.contactPbx = CONTACT_PBX;

    await this.nodemailerService.sendEmail(emailUserCreationNotificationToSend);

    return newUserEps;
  }

  // GET FUNTIONS //

  async getAllUsers() {
    const allUsers = await this.userRepository.find({
      where: {
        is_active: true,
      },
      order: {
        createdAt: 'ASC',
      },
    });

    if (!allUsers.length) {
      return new HttpException(
        `No hay usuarios registrados en la base de datos`,
        HttpStatus.CONFLICT,
      );
    } else {
      return allUsers;
    }
  }

  async getAllUsersPatient() {
    const userRolePatient = await this.userRoleRepository.findOne({
      where: {
        name: UserRolType.PATIENT,
      },
    });

    if (userRolePatient) {
      const allUsersPerson = await this.userRepository.find({
        where: {
          role: userRolePatient,
        },
        order: {
          createdAt: 'DESC',
        },
      });

      if (!allUsersPerson.length) {
        return new HttpException(
          `No hay usuarios registrados en la base de datos`,
          HttpStatus.NOT_FOUND,
        );
      } else {
        return allUsersPerson;
      }
    } else {
      throw new HttpException(
        'No hay role creado de "Paciente".',
        HttpStatus.CONFLICT,
      );
    }
  }

  async getAllUsersEps() {
    const userRoleEps = await this.userRoleRepository.findOne({
      where: {
        name: UserRolType.EPS,
      },
    });

    if (userRoleEps) {
      const allUsersEps = await this.userRepository.find({
        where: {
          role: userRoleEps,
        },
        order: {
          createdAt: 'DESC',
        },
      });

      if (!allUsersEps.length) {
        return new HttpException(
          `No hay usuarios registrados en la base de datos`,
          HttpStatus.NOT_FOUND,
        );
      } else {
        return allUsersEps;
      }
    } else {
      throw new HttpException(
        'No hay role creado de "Eps".',
        HttpStatus.CONFLICT,
      );
    }
  }

  async getUsersById(id: string) {
    const userPersonFound = await this.userRepository.findOne({
      where: {
        id: id,
        is_active: true,
      },
      relations: ['medical_req'],
    });

    if (!userPersonFound) {
      return new HttpException(
        `El usuario con número de ID: ${id} no esta registrado.`,
        HttpStatus.CONFLICT,
      );
    } else {
      return userPersonFound;
    }
  }

  async getPatientUserByIdNumber(idNumber: number) {
    const userRolePatient = await this.userRoleRepository.findOne({
      where: {
        name: UserRolType.PATIENT,
      },
    });

    if (!userRolePatient) {
      throw new HttpException(
        'El rol "Paciente" no existe.',
        HttpStatus.NOT_FOUND,
      );
    }

    const patientUserFound = await this.userRepository.findOne({
      where: {
        id_number: idNumber,
        user_role: userRolePatient.id,
        is_active: true,
      },
    });

    if (!patientUserFound) {
      return new HttpException(
        `El usuario paciente con número de identificación personal: ${idNumber} no esta registrado.`,
        HttpStatus.CONFLICT,
      );
    } else {
      return patientUserFound;
    }
  }

  async getEpsUserByIdNumber(idNumber: number) {
    const userRoleEps = await this.userRoleRepository.findOne({
      where: {
        name: UserRolType.EPS,
      },
    });

    if (!userRoleEps) {
      throw new HttpException('El rol "Eps" no existe.', HttpStatus.NOT_FOUND);
    }

    const epsUserFound = await this.userRepository.findOne({
      where: {
        id_number: idNumber,
        user_role: userRoleEps.id,
        is_active: true,
      },
    });

    if (!epsUserFound) {
      return new HttpException(
        `El usuario eps con número de identificación personal: ${idNumber} no esta registrado.`,
        HttpStatus.CONFLICT,
      );
    } else {
      return epsUserFound;
    }
  }

  async getAllAuthorizedPatientRelatives(patientId: string) {
    const patientFound = await this.userRepository.findOne({
      where: {
        id: patientId,
      },
    });

    if (!patientFound) {
      return new HttpException(
        `El usuario no está registrado.`,
        HttpStatus.CONFLICT,
      );
    }

    const allRelativesOfPatientFound = await this.familiarRepository.find({
      where: {
        patient_id: patientId,
        is_active: true,
      },
      order: {
        createdAt: 'DESC',
      },
    });

    if (allRelativesOfPatientFound.length === 0) {
      return new HttpException(
        `El usuario no tiene familiares agregados actualmente.`,
        HttpStatus.CONFLICT,
      );
    } else {
      return allRelativesOfPatientFound;
    }
  }

  async getUserFoundByIdNumber(idType: number, idNumber: number) {
    return await this.userRepository.findOneBy({
      user_id_type: idType,
      id_number: idNumber,
      is_active: true,
    });
  }

  async getUserFoundByIdNumberWithPassword(
    userIdType: number,
    idNumber: number,
  ) {
    return await this.userRepository.findOne({
      where: { user_id_type: userIdType, id_number: idNumber },
      select: [
        'id',
        'name',
        'user_id_type',
        'id_number',
        'password',
        'email',
        'authentication_method',
        'role',
      ],
    });
  }

  async getUserFoundByIdAndCode(idNumber: number, verificationCode: number) {
    return await this.userRepository.findOneBy({
      id_number: idNumber,
      verification_code: verificationCode,
      is_active: true,
    });
  }

  // UPDATE FUNTIONS //

  async updateUserPatient(id: string, userPatient: UpdateUserPatientDto) {
    const userFound = await this.userRepository.findOneBy({
      id,
      is_active: true,
    });

    if (!userFound) {
      return new HttpException(
        `Usuario no encontrado.`,
        HttpStatus.UNAUTHORIZED,
      );
    }

    const userRolePatient = await this.userRoleRepository.findOne({
      where: {
        name: UserRolType.PATIENT,
      },
    });

    if (userFound.user_role !== userRolePatient.id) {
      return new HttpException(
        `No tienes permiso para actualizar este usuario.`,
        HttpStatus.UNAUTHORIZED,
      );
    }

    const emailUserPatientValidate = await this.userRepository.findOne({
      where: {
        id: Not(userFound.id),
        email: userPatient.email,
      },
    });

    if (emailUserPatientValidate) {
      return new HttpException(
        `El correo electrónico ${userPatient.email} ya está registrado.`,
        HttpStatus.CONFLICT,
      );
    }

    const cellphoneUserPatientValidate = await this.userRepository.findOne({
      where: {
        id: Not(userFound.id),
        cellphone: userPatient.cellphone,
      },
    });

    if (cellphoneUserPatientValidate) {
      return new HttpException(
        `El número de celular ${userPatient.cellphone} ya está registrado.`,
        HttpStatus.CONFLICT,
      );
    }

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
      return new HttpException(
        `El método de autenticación "Email" no existe.`,
        HttpStatus.NOT_FOUND,
      );
    }

    if (!authenticationMethodCellphoneFound) {
      return new HttpException(
        `El método de autenticación "Célular" no existe.`,
        HttpStatus.NOT_FOUND,
      );
    }

    if (
      userPatient.authentication_method ===
        authenticationMethodCellphoneFound.id &&
      !userPatient.cellphone
    ) {
      return new HttpException(
        `Debe ingresar un número de celular para activar el método de autenticación seleccionado`,
        HttpStatus.CONFLICT,
      );
    }

    if (
      userPatient.authentication_method === authenticationMethodEmailFound.id &&
      !userPatient.email
    ) {
      return new HttpException(
        `Debe ingresar un correo electrónico para activar el método de autenticación seleccionado`,
        HttpStatus.CONFLICT,
      );
    }

    const updateUserPatient = await this.userRepository.update(id, userPatient);

    if (updateUserPatient.affected === 0) {
      return new HttpException(`Usuario no encontrado`, HttpStatus.CONFLICT);
    }

    return new HttpException(
      `¡Datos guardados correctamente!`,
      HttpStatus.ACCEPTED,
    );
  }

  async updateUserEps(id: string, userEps: UpdateUserEpsDto) {
    const userFound = await this.userRepository.findOneBy({
      id,
      is_active: true,
    });

    if (!userFound) {
      return new HttpException(
        `Usuario no encontrado.`,
        HttpStatus.UNAUTHORIZED,
      );
    }

    const userRoleEps = await this.userRoleRepository.findOne({
      where: {
        name: UserRolType.EPS,
      },
    });

    if (userFound.user_role !== userRoleEps.id) {
      return new HttpException(
        `No tienes permiso para actualizar este usuario.`,
        HttpStatus.UNAUTHORIZED,
      );
    }

    const emailUserEpsValidate = await this.userRepository.findOne({
      where: {
        id: Not(userFound.id),
        email: userEps.email,
      },
    });

    if (emailUserEpsValidate) {
      return new HttpException(
        `El correo electrónico ${userEps.email} ya está registrado.`,
        HttpStatus.CONFLICT,
      );
    }

    const isCorporateEmail = await validateCorporateEmail(userEps.email);

    if (!isCorporateEmail) {
      throw new HttpException(
        `El email : ${userEps.email} no es un correo corporativo válido.`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const cellphoneUserEpsValidate = await this.userRepository.findOne({
      where: {
        id: Not(userFound.id),
        cellphone: userEps.cellphone,
      },
    });

    if (cellphoneUserEpsValidate) {
      return new HttpException(
        `El número de celular ${userEps.cellphone} ya está registrado.`,
        HttpStatus.CONFLICT,
      );
    }

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
      return new HttpException(
        `El método de autenticación "Email" no existe.`,
        HttpStatus.NOT_FOUND,
      );
    }

    if (!authenticationMethodCellphoneFound) {
      return new HttpException(
        `El método de autenticación "Célular" no existe.`,
        HttpStatus.NOT_FOUND,
      );
    }

    if (
      userEps.authentication_method === authenticationMethodCellphoneFound.id &&
      !userEps.cellphone
    ) {
      return new HttpException(
        `Debe ingresar un número de celular para activar el método de autenticación seleccionado`,
        HttpStatus.CONFLICT,
      );
    }

    if (
      userEps.authentication_method === authenticationMethodEmailFound.id &&
      !userEps.email
    ) {
      return new HttpException(
        `Debe ingresar un correo electrónico para activar el método de autenticación seleccionado`,
        HttpStatus.CONFLICT,
      );
    }

    const updateUserEps = await this.userRepository.update(id, userEps);

    if (updateUserEps.affected === 0) {
      return new HttpException(`Usuario no encontrado`, HttpStatus.CONFLICT);
    }

    return new HttpException(
      `¡Datos guardados correctamente!`,
      HttpStatus.ACCEPTED,
    );
  }

  async updateUserPassword(id: string, passwords: UpdatePasswordUserDto) {
    const userFound = await this.userRepository
      .createQueryBuilder('user')
      .addSelect(['user.password'])
      .where('user.id = :id', { id })
      .getOne();

    if (!userFound) {
      throw new HttpException(
        `Usuario no encontrado.`,
        HttpStatus.UNAUTHORIZED,
      );
    }

    const isPasswordValid = await bcryptjs.compare(
      passwords.oldPassword,
      userFound.password,
    );

    if (!isPasswordValid) {
      throw new HttpException(
        `Contraseña antigua incorrecta.`,
        HttpStatus.UNAUTHORIZED,
      );
    }

    const isNewPasswordSameAsOld = await bcryptjs.compare(
      passwords.newPassword,
      userFound.password,
    );

    if (isNewPasswordSameAsOld) {
      throw new HttpException(
        `La nueva contraseña no puede ser igual a la antigua.`,
        HttpStatus.CONFLICT,
      );
    }

    const hashedNewPassword = await bcryptjs.hash(passwords.newPassword, 10);

    await this.userRepository.update(id, { password: hashedNewPassword });

    const emailDetailsToSend = new SendEmailDto();

    emailDetailsToSend.recipients = [userFound.email];
    emailDetailsToSend.userNameToEmail = userFound.name;
    emailDetailsToSend.subject = PASSWORD_UPDATED;
    emailDetailsToSend.emailTemplate = UPDATED_PASSWORD_TEMPLATE;
    emailDetailsToSend.portalWebUrl = process.env.PORTAL_WEB_URL;
    emailDetailsToSend.contactPbx = CONTACT_PBX;

    await this.nodemailerService.sendEmail(emailDetailsToSend);

    return new HttpException(
      `¡Contraseña actualizada correctamente!`,
      HttpStatus.ACCEPTED,
    );
  }

  async forgotUserPatientPassword({
    id_type,
    id_number,
    birthdate,
  }: ForgotPasswordUserPatientDto) {
    const userFound = await this.userRepository.findOne({
      where: {
        user_id_type: id_type,
        id_number: id_number,
        birthdate: birthdate,
        is_active: true,
      },
    });

    if (userFound) {
      const resetPasswordToken = nanoid(64);

      await this.userRepository.update(
        {
          id: userFound.id,
        },
        { reset_password_token: resetPasswordToken },
      );

      const emailDetailsToSend = new SendEmailDto();

      emailDetailsToSend.recipients = [userFound.email];
      emailDetailsToSend.userNameToEmail = userFound.name;
      emailDetailsToSend.subject = PASSWORD_RESET;
      emailDetailsToSend.emailTemplate = RESET_PASSWORD_TEMPLATE;
      emailDetailsToSend.resetPasswordUrl = `${process.env.RESET_PASSWORD_URL_USER}?token=${resetPasswordToken}`;

      await this.nodemailerService.sendEmail(emailDetailsToSend);

      schedule.scheduleJob(new Date(Date.now() + 5 * 60 * 1000), async () => {
        await this.userRepository.update(
          { id: userFound.id },
          { reset_password_token: null },
        );
      });

      const maskedEmail = maskEmailUser(userFound.email);

      return new HttpException(
        `Se ha enviado al correo: ${maskedEmail} el link de restablecimiento de contraseña`,
        HttpStatus.ACCEPTED,
      );
    } else {
      throw new UnauthorizedException(
        `¡Datos incorrectos o no esta registrado!`,
      );
    }
  }

  async forgotUserEpsPassword({
    id_type,
    id_number,
    eps_company,
  }: ForgotPasswordUserEpsDto) {
    const userFound = await this.userRepository.findOne({
      where: {
        user_id_type: id_type,
        id_number: id_number,
        eps_company: eps_company,
        is_active: true,
      },
    });

    if (userFound) {
      const resetPasswordToken = nanoid(64);

      await this.userRepository.update(
        {
          id: userFound.id,
        },
        { reset_password_token: resetPasswordToken },
      );

      const emailDetailsToSend = new SendEmailDto();

      emailDetailsToSend.recipients = [userFound.email];
      emailDetailsToSend.userNameToEmail = userFound.name;
      emailDetailsToSend.subject = PASSWORD_RESET;
      emailDetailsToSend.emailTemplate = RESET_PASSWORD_TEMPLATE;
      emailDetailsToSend.resetPasswordUrl = `${process.env.RESET_PASSWORD_URL_USER}?token=${resetPasswordToken}`;

      await this.nodemailerService.sendEmail(emailDetailsToSend);

      schedule.scheduleJob(new Date(Date.now() + 5 * 60 * 1000), async () => {
        await this.userRepository.update(
          { id: userFound.id },
          { reset_password_token: null },
        );
      });

      const maskedEmail = maskEmailUser(userFound.email);

      return new HttpException(
        `Se ha enviado al correo: ${maskedEmail} el link de restablecimiento de contraseña`,
        HttpStatus.ACCEPTED,
      );
    } else {
      throw new UnauthorizedException(
        `¡Datos incorrectos o usuario no registrado!`,
      );
    }
  }

  async resetUserPassword(
    token: string,
    { newPassword: new_password }: ResetPasswordUserDto,
  ) {
    const tokenFound = await this.userRepository.findOne({
      where: {
        reset_password_token: token,
        is_active: true,
      },
    });

    if (!tokenFound) {
      throw new UnauthorizedException('¡Link invalido o caducado!');
    }

    const userFound = await this.userRepository.findOneBy({
      id: tokenFound.id,
    });

    if (!userFound) {
      throw new UnauthorizedException('¡Usuario no encontrado!');
    }

    const hashedNewPassword = await bcryptjs.hash(new_password, 10);

    await this.userRepository.update(userFound.id, {
      password: hashedNewPassword,
      reset_password_token: null,
    });

    return new HttpException(
      `¡Contraseña restablecida correctamente!`,
      HttpStatus.ACCEPTED,
    );
  }

  // DELETED-BAN FUNTIONS //

  async banUsers(id: string) {
    const userFound = await this.userRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!userFound) {
      return new HttpException(
        `El usuario con número de ID: ${id} no esta registrado.`,
        HttpStatus.CONFLICT,
      );
    }

    userFound.is_active = !userFound.is_active;

    await this.userRepository.save(userFound);

    const statusMessage = userFound.is_active
      ? `El usuario con número de ID: ${userFound.id_number} se ha ACTIVADO.`
      : `El usuario con número de ID: ${userFound.id_number} se ha INACTIVADO.`;

    throw new HttpException(statusMessage, HttpStatus.ACCEPTED);
  }
}
