import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { AuthorizedFamiliar } from '../../authorized_familiar/entities/authorized_familiar.entity';
import { UserRole } from '../../user_roles/entities/user_role.entity';
import { UserRolType } from '../../common/enums/user_roles.enum';
import { IdTypeEntity } from '../../id_types/entities/id_type.entity';
import { IdType } from '../../common/enums/id_type.enum';
import { IdTypeAbbrev } from '../enums/id_type_abbrev.enum';
import { AuthenticationMethod } from '../../authentication_method/entities/authentication_method.entity';
import { AuthenticationMethodEnum } from '../../common/enums/authentication_method.enum';
import { DeptsAndCitiesService } from '../../depts_and_cities/services/depts_and_cities.service';
import { CreateUserPatientDto } from '../dto/create_user_patient.dto';
import { UpdateUserPatientDto } from '../dto/update_user_patient.dto';
import { CreateUserEpsDto } from '../dto/create_user_eps.dto';
import { UpdateUserEpsDto } from '../dto/update_user_eps.dto';
import { UpdatePasswordUserDto } from '../dto/update_password_user.dto';
import { ValidatePatientDto } from '../dto/validate_patient.dto';

import * as bcryptjs from 'bcryptjs';
import axios from 'axios';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,

    @InjectRepository(AuthorizedFamiliar)
    private familiarRepository: Repository<AuthorizedFamiliar>,

    @InjectRepository(UserRole)
    private userRoleRepository: Repository<UserRole>,

    @InjectRepository(IdTypeEntity)
    private idTypeRepository: Repository<IdTypeEntity>,

    @InjectRepository(AuthenticationMethod)
    private authenticationMethodRepository: Repository<AuthenticationMethod>,

    private locationService: DeptsAndCitiesService,
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
          HttpStatus.NOT_FOUND,
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

    const authenticationMethodFound =
      await this.authenticationMethodRepository.findOne({
        where: {
          id: userPatient.authentication_method,
        },
      });

    if (!authenticationMethodFound) {
      return new HttpException(
        `El método de autenticación ingresado no es válido.`,
        HttpStatus.CONFLICT,
      );
    }

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
        HttpStatus.INTERNAL_SERVER_ERROR,
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
      authentication_method: authenticationMethodFound.id,
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
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    await this.userRepository.update(userPatientWithRole.id, userPatient);

    const newUserPatient = await this.userRepository.findOne({
      where: { id: userPatientWithRole.id },
    });

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

    const authenticationMethodFound =
      await this.authenticationMethodRepository.findOne({
        where: {
          name: AuthenticationMethodEnum.EMAIL,
        },
      });

    if (!authenticationMethodFound) {
      return new HttpException(
        `El método de autenticación "Email" no existe.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const roleEpsFound = await this.userRoleRepository.findOne({
      where: {
        name: UserRolType.EPS,
      },
    });

    if (!roleEpsFound) {
      throw new HttpException(
        'El rol "Eps" no existe.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const insertRoleUserEps = await this.userRepository.create({
      ...userEps,
      user_role: roleEpsFound.id,
      authentication_method: authenticationMethodFound.id,
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
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    await this.userRepository.update(userEpsWithRole.id, userEps);

    const newUserEps = await this.userRepository.findOne({
      where: { id: userEpsWithRole.id },
    });

    return newUserEps;
  }

  // GET FUNTIONS //

  async getAllUsers() {
    const allUsers = await this.userRepository.find({
      where: {
        is_active: true,
      },
      order: {
        name: 'ASC',
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
          is_active: true,
        },
        order: {
          name: 'ASC',
        },
      });

      if (!allUsersPerson.length) {
        return new HttpException(
          `No hay usuarios registrados en la base de datos`,
          HttpStatus.CONFLICT,
        );
      } else {
        return allUsersPerson;
      }
    } else {
      throw new HttpException(
        'No hay role creado de "Paciente".',
        HttpStatus.INTERNAL_SERVER_ERROR,
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
          is_active: true,
        },
        order: {
          name: 'ASC',
        },
      });

      if (!allUsersEps.length) {
        return new HttpException(
          `No hay usuarios registrados en la base de datos`,
          HttpStatus.CONFLICT,
        );
      } else {
        return allUsersEps;
      }
    } else {
      throw new HttpException(
        'No hay role creado de "Eps".',
        HttpStatus.INTERNAL_SERVER_ERROR,
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
        HttpStatus.INTERNAL_SERVER_ERROR,
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
      throw new HttpException(
        'El rol "Eps" no existe.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
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

  async getUserFoundByIdNumber(idNumber: number) {
    return await this.userRepository.findOneBy({
      id_number: idNumber,
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
    const userFound = await this.userRepository.findOneBy({ id });

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
    const userFound = await this.userRepository.findOneBy({ id });

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
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashedNewPassword = await bcryptjs.hash(passwords.newPassword, 10);

    await this.userRepository.update(id, { password: hashedNewPassword });

    return new HttpException(
      `Contraseña actualizada correctamente.`,
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

    return new HttpException(
      `El usuario con número de identidad: ${userFound.id_number} está con estado activo: ${userFound.is_active}`,
      HttpStatus.CONFLICT,
    );
  }
}
