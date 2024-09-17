import { Injectable, HttpException, HttpStatus, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { AuthorizedFamiliar } from '../entities/authorized_familiar.entity';
import { User } from '../../users/entities/user.entity';
import { UserRole } from '../../user_roles/entities/user_role.entity';
import { UserRolType } from 'shared/utils/enums/user_roles.enum';
import { CreateAuthorizedFamiliarDto } from '../dto/create-authorized_familiar.dto';
import { UpdateAuthorizedFamiliarDto } from '../dto/update-authorized_familiar.dto';
import { AuthenticationMethod } from '../../authentication_method/entities/authentication_method.entity';
import { AuthenticationMethodEnum } from 'shared/utils/enums/authentication_method.enum';
import { FamiliarLoginDto } from 'src/auth/dto/familiar_login.dto';
import { NodemailerService } from 'src/nodemailer/services/nodemailer.service';
import { AuditLogsService } from 'src/audit_logs/services/audit_logs.service';
import { SendEmailDto } from 'src/nodemailer/dto/send_email.dto';
import {
  ADDED_AS_AUTHORIZED_RELATIVE,
  ADDED_FAMILY,
} from 'src/nodemailer/constants/email_config.constant';
import { ActionTypesEnum } from 'src/audit_logs/utils/enums/action_types.enum';
import { QueryTypesEnum } from 'src/audit_logs/utils/enums/query_types.enum';
import { ModuleNameEnum } from 'src/audit_logs/utils/enums/module_names.enum';

@Injectable()
export class AuthorizedFamiliarService {
  constructor(
    @InjectRepository(AuthorizedFamiliar)
    private familiarRepository: Repository<AuthorizedFamiliar>,

    @InjectRepository(User) private userRepository: Repository<User>,

    @InjectRepository(UserRole)
    private userRoleRepository: Repository<UserRole>,

    @InjectRepository(AuthenticationMethod)
    private authenticationMethodRepository: Repository<AuthenticationMethod>,

    private readonly nodemailerService: NodemailerService,

    private readonly auditLogService: AuditLogsService,
  ) {}

  // CREATE FUNTIONS //

  async createUserFamiliar(
    userId: string,
    familiar: CreateAuthorizedFamiliarDto,
  ) {
    const patientRole = await this.userRoleRepository.findOne({
      where: { name: UserRolType.PATIENT },
    });

    if (!patientRole) {
      return new HttpException(
        `El rol "Paciente" no existe.`,
        HttpStatus.CONFLICT,
      );
    }

    const patientFound = await this.userRepository.findOne({
      where: {
        id: userId,
        is_active: true,
        user_role: patientRole.id,
      },
    });

    if (!patientFound) {
      return new HttpException(
        `El paciente no se encuentra registrado.`,
        HttpStatus.CONFLICT,
      );
    }

    const familiarWithPatientFound = await this.familiarRepository.findOne({
      where: {
        id_number: familiar.id_number,
        patient_id: patientFound.id,
        is_active: true,
      },
    });

    if (familiarWithPatientFound) {
      return new HttpException(
        `El familiar con número de identificación: ${familiar.id_number} ya está registrado con este paciente.`,
        HttpStatus.CONFLICT,
      );
    }

    const userFamiliarEmailFound = await this.familiarRepository.findOne({
      where: {
        email: familiar.email,
      },
    });

    const userPatientEmailFound = await this.userRepository.findOne({
      where: {
        email: familiar.email,
      },
    });

    if (userFamiliarEmailFound || userPatientEmailFound) {
      return new HttpException(
        `El correo electrónico ${familiar.email} ya está registrado.`,
        HttpStatus.CONFLICT,
      );
    }

    if (familiar.cellphone) {
      const userFamiliarCellphoneFound = await this.familiarRepository.findOne({
        where: {
          cellphone: familiar.cellphone,
        },
      });

      const userPatientCellphoneFound = await this.userRepository.findOne({
        where: {
          cellphone: familiar.cellphone,
        },
      });

      if (userFamiliarCellphoneFound || userPatientCellphoneFound) {
        return new HttpException(
          `El número de celular ${familiar.cellphone} ya está registrado.`,
          HttpStatus.CONFLICT,
        );
      }
    }

    // const authenticationMethodFound =
    //   await this.authenticationMethodRepository.findOne({
    //     where: {
    //       id: familiar.authentication_method,
    //     },
    //   });

    // if (!authenticationMethodFound) {
    //   return new HttpException(
    //     `El método de autenticación ingresado no es válido.`,
    //     HttpStatus.CONFLICT,
    //   );
    // }

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
      familiar.authentication_method ===
        authenticationMethodCellphoneFound.id &&
      !familiar.cellphone
    ) {
      return new HttpException(
        `Debe ingresar un número de celular para activar el método de autenticación seleccionado`,
        HttpStatus.CONFLICT,
      );
    }

    if (
      familiar.authentication_method === authenticationMethodEmailFound.id &&
      !familiar.email
    ) {
      return new HttpException(
        `Debe ingresar un correo electrónico para activar el método de autenticación seleccionado`,
        HttpStatus.CONFLICT,
      );
    }

    const [relatives, count] = await this.familiarRepository.findAndCount({
      where: {
        is_active: true,
        patient_id_number: patientFound.id_number,
      },
    });

    if (count >= 3) {
      return new HttpException(
        `El paciente no puede tener más de 3 familiares registrados`,
        HttpStatus.CONFLICT,
      );
    }

    const familiarWithAnotherPatient = await this.familiarRepository.findOne({
      where: {
        id_number: familiar.id_number,
      },
    });

    if (familiarWithAnotherPatient) {
      const newFamiliar = await this.familiarRepository.create({
        ...familiar,
        user_role: familiarWithAnotherPatient.user_role,
        patient_id: patientFound.id,
        patient_id_number: patientFound.id_number,
        authentication_method: authenticationMethodEmailFound.id,
        accept_terms: true,
      });

      const familiarWithRole = await this.familiarRepository.save(newFamiliar);

      const patientFamiliar = await this.userRepository.findOne({
        where: { id: userId },
      });

      const newFamiliarOfOtherPatient = await this.familiarRepository.findOne({
        where: { id: familiarWithRole.id },
      });

      await patientFamiliar.familiar.push(newFamiliarOfOtherPatient);

      await this.userRepository.save(patientFamiliar);

      return newFamiliarOfOtherPatient;
    }

    const roleFamiliarFound = await this.userRoleRepository.findOne({
      where: {
        name: UserRolType.AUTHORIZED_FAMILIAR,
      },
    });

    if (!roleFamiliarFound) {
      throw new HttpException(
        'El rol "Familiar Autorizado" no existe.',
        HttpStatus.NOT_FOUND,
      );
    }

    const insertRoleFamiliar = await this.familiarRepository.create({
      ...familiar,
      user_role: roleFamiliarFound.id,
      patient_id: patientFound.id,
      patient_id_number: patientFound.id_number,
      authentication_method: authenticationMethodEmailFound.id,
      accept_terms: true,
    });

    const familiarWithRole =
      await this.familiarRepository.save(insertRoleFamiliar);

    const familiarRole = await this.userRoleRepository.findOne({
      where: {
        id: familiarWithRole.user_role,
        name: UserRolType.AUTHORIZED_FAMILIAR,
      },
    });

    if (!familiarRole) {
      throw new HttpException(
        'El usuario debe tener el rol "Familiar Autorizado".',
        HttpStatus.CONFLICT,
      );
    }

    await this.familiarRepository.update(familiarWithRole.id, familiar);

    const newFamiliar = await this.familiarRepository.findOne({
      where: { id: familiarWithRole.id },
    });

    const patientFamiliar = await this.userRepository.findOne({
      where: { id: userId },
    });

    const newFamiliarOfPatient = await this.familiarRepository.findOne({
      where: { id: newFamiliar.id },
    });

    await patientFamiliar.familiar.push(newFamiliarOfPatient);

    await this.userRepository.save(patientFamiliar);

    await this.familiarRepository.update(
      familiarWithRole.id,
      newFamiliarOfPatient,
    );

    const newUserFamiliarOfPatient = await this.familiarRepository.findOne({
      where: { id: familiarWithRole.id },
    });

    const emailDetailsToSend = new SendEmailDto();

    emailDetailsToSend.recipients = [
      newUserFamiliarOfPatient.email,
      patientFamiliar.email,
    ];
    emailDetailsToSend.userNameToEmail = newUserFamiliarOfPatient.name;
    emailDetailsToSend.patientNameToEmail = patientFamiliar.name;
    emailDetailsToSend.relationshipWithPatient =
      newUserFamiliarOfPatient.relationship_with_patient.name;
    emailDetailsToSend.emailOfFamiliar = newUserFamiliarOfPatient.email;
    emailDetailsToSend.subject = ADDED_AS_AUTHORIZED_RELATIVE;
    emailDetailsToSend.emailTemplate = ADDED_FAMILY;
    emailDetailsToSend.portalWebUrl = process.env.PORTAL_WEB_URL;

    await this.nodemailerService.sendEmail(emailDetailsToSend);

    return newUserFamiliarOfPatient;
  }

  // GET FUNTIONS //

  async getAllRelatives() {
    const userRoleFamiliar = await this.userRoleRepository.findOne({
      where: {
        name: UserRolType.AUTHORIZED_FAMILIAR,
      },
    });

    if (userRoleFamiliar) {
      const allUsersFamiliar = await this.familiarRepository.find({
        where: {
          role: userRoleFamiliar,
        },
        order: {
          createdAt: 'DESC',
        },
      });

      if (!allUsersFamiliar.length) {
        return new HttpException(
          `No hay familiares registrados en la base de datos`,
          HttpStatus.NOT_FOUND,
        );
      } else {
        return allUsersFamiliar;
      }
    } else {
      throw new HttpException(
        'No hay role creado de "Familiar".',
        HttpStatus.CONFLICT,
      );
    }
  }

  async getFamiliarById(id: string) {
    const userFamiliarFound = await this.familiarRepository.findOne({
      where: {
        id: id,
        is_active: true,
      },
      relations: ['medical_req'],
    });

    if (!userFamiliarFound) {
      return new HttpException(
        `El usuario con número de ID: ${id} no esta registrado.`,
        HttpStatus.CONFLICT,
      );
    } else {
      return userFamiliarFound;
    }
  }

  async getFamiliarFoundByIdNumber(
    idType: number,
    idNumber: number,
    familiarEmail: string,
  ) {
    return await this.familiarRepository.findOneBy({
      user_id_type: idType,
      id_number: idNumber,
      email: familiarEmail,
    });
  }

  async getFamiliarCompleteByIdNumber(idNumber: number) {
    const familiarFound = await this.familiarRepository.findOne({
      where: {
        id_number: idNumber,
      },
      relations: ['medical_req'],
    });

    if (!familiarFound) {
      return new HttpException(
        `El familiar con número de identificación personal: ${idNumber} no esta registrado.`,
        HttpStatus.CONFLICT,
      );
    } else {
      return familiarFound;
    }
  }

  async getFamiliarWithPatient({
    id_type_familiar,
    id_number_familiar,
    email_familiar,
    patient_id_number,
    rel_with_patient,
  }: FamiliarLoginDto) {
    const patientData = await this.userRepository.findOne({
      where: {
        id_number: patient_id_number,
      },
    });

    if (!patientData) {
      return null;
    }

    const familiarPatient = await this.familiarRepository.findOne({
      where: {
        user_id_type: id_type_familiar,
        id_number: id_number_familiar,
        email: email_familiar,
        patient_id: patientData.id,
        rel_with_patient: rel_with_patient,
      },
      select: [
        'id',
        'name',
        'user_id_type',
        'id_number',
        'email',
        'role',
        'patient_id',
      ],
    });

    if (!familiarPatient) {
      return null;
    }

    const verifiedRelationship = patientData.familiar.find(
      (f) => f.id === familiarPatient.id,
    );

    if (!verifiedRelationship) {
      return null;
    }

    return familiarPatient;
  }

  async getFamiliarFoundByIdAndCode(
    idNumber: number,
    verificationCode: number,
  ) {
    return await this.familiarRepository.findOneBy({
      id_number: idNumber,
      verification_code: verificationCode,
      is_active: true,
    });
  }

  // UPDATE FUNTIONS //

  async updateUserFamiliar(
    id: string,
    userFamiliar: UpdateAuthorizedFamiliarDto,
  ) {
    const familiarFound = await this.familiarRepository.findOneBy({
      id,
      is_active: true,
    });

    if (!familiarFound) {
      return new HttpException(
        `Usuario no encontrado.`,
        HttpStatus.UNAUTHORIZED,
      );
    }

    const userRoleFamiliar = await this.userRoleRepository.findOne({
      where: {
        name: UserRolType.AUTHORIZED_FAMILIAR,
      },
    });

    if (familiarFound.user_role !== userRoleFamiliar.id) {
      return new HttpException(
        `No tienes permiso para actualizar este usuario.`,
        HttpStatus.UNAUTHORIZED,
      );
    }

    const emailUserFamiliarValidate = await this.familiarRepository.findOne({
      where: {
        id: Not(familiarFound.id),
        email: userFamiliar.email,
      },
    });

    if (emailUserFamiliarValidate) {
      return new HttpException(
        `El correo electrónico ${userFamiliar.email} ya está registrado.`,
        HttpStatus.CONFLICT,
      );
    }

    const cellphoneUserFamiliarValidate = await this.familiarRepository.findOne(
      {
        where: {
          id: Not(familiarFound.id),
          cellphone: userFamiliar.cellphone,
        },
      },
    );

    if (cellphoneUserFamiliarValidate) {
      return new HttpException(
        `El número de celular ${userFamiliar.cellphone} ya está registrado.`,
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
      userFamiliar.authentication_method ===
        authenticationMethodCellphoneFound.id &&
      !userFamiliar.cellphone
    ) {
      return new HttpException(
        `Debe ingresar un número de celular para activar el método de autenticación seleccionado`,
        HttpStatus.CONFLICT,
      );
    }

    if (
      userFamiliar.authentication_method ===
        authenticationMethodEmailFound.id &&
      !userFamiliar.email
    ) {
      return new HttpException(
        `Debe ingresar un correo electrónico para activar el método de autenticación seleccionado`,
        HttpStatus.CONFLICT,
      );
    }

    const updateUserFamiliar = await this.familiarRepository.update(
      id,
      userFamiliar,
    );

    if (updateUserFamiliar.affected === 0) {
      return new HttpException(`Usuario no encontrado`, HttpStatus.CONFLICT);
    }

    return new HttpException(
      `¡Datos guardados correctamente!`,
      HttpStatus.ACCEPTED,
    );
  }

  // DELETED-BAN FUNTIONS //

  async banRelatives(id: string, @Req() requestAuditLog: any) {
    const familiarFound = await this.familiarRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!familiarFound) {
      return new HttpException(
        `El familiar con número de ID: ${id} no esta registrado.`,
        HttpStatus.CONFLICT,
      );
    }

    familiarFound.is_active = !familiarFound.is_active;

    await this.familiarRepository.save(familiarFound);

    const auditLogData = {
      ...requestAuditLog.auditLogData,
      action_type:
        familiarFound.is_active === false
          ? ActionTypesEnum.BAN_USER_FAMILIAR
          : ActionTypesEnum.UNBAN_USER_FAMILIAR,
      query_type: QueryTypesEnum.PATCH,
      module_name: ModuleNameEnum.RELATIVES_MODULE,
      module_record_id: familiarFound.id,
    };

    await this.auditLogService.createAuditLog(auditLogData);

    const statusMessage = familiarFound.is_active
      ? `El familiar con número de ID: ${familiarFound.id_number} se ha ACTIVADO.`
      : `El familiar con número de ID: ${familiarFound.id_number} se ha INACTIVADO.`;

    throw new HttpException(statusMessage, HttpStatus.ACCEPTED);
  }
}
