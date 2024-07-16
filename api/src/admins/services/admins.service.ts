import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from '../entities/admin.entity';
import { AdminRole } from '../../admin_roles/entities/admin_role.entity';
import { PositionLevel } from '../../position_level/entities/position_level.entity';
import { AdminRolType } from '../../utils/enums/admin_roles.enum';
import { AuthenticationMethod } from 'src/authentication_method/entities/authentication_method.entity';
import { CreateSuperAdminDto } from '../dto/create_super_admin.dto';
import { CreateAdminDto } from '../dto/create_admin.dto';
import { UpdateAdminDto } from '../dto/update_admin.dto';
import { UpdatePasswordAdminDto } from '../dto/update_password_admin.dto';
import { ForgotPasswordAdminDto } from '../dto/forgot_password_admin.dto';
import { ResetPasswordAdminDto } from '../dto/reset_password_admin.dto';

import { nanoid } from 'nanoid';
import { NodemailerService } from '../../nodemailer/services/nodemailer.service';
import { AuthenticationMethodEnum } from 'src/utils/enums/authentication_method.enum';
import { SendEmailDto } from 'src/nodemailer/dto/send_email.dto';
import {
  PASSWORD_RESET,
  RESET_PASSWORD_TEMPLATE,
} from 'src/nodemailer/constants/email_config.constant';

import * as bcryptjs from 'bcryptjs';
import { maskEmailAdmin } from 'src/admin_roles/helpers/mask_email';

const schedule = require('node-schedule');

@Injectable()
export class AdminsService {
  constructor(
    @InjectRepository(Admin) private adminRepository: Repository<Admin>,

    @InjectRepository(AdminRole)
    private adminRoleRepository: Repository<AdminRole>,

    @InjectRepository(PositionLevel)
    private positionLevelRepository: Repository<PositionLevel>,

    @InjectRepository(AuthenticationMethod)
    private authenticationMethodRepository: Repository<AuthenticationMethod>,

    private readonly nodemailerService: NodemailerService,
  ) {}

  // CREATE FUNTIONS //

  async createSuperAdmin(superAdmin: CreateSuperAdminDto) {
    const superAdminFound = await this.adminRepository.findOne({
      where: {
        id_number: superAdmin.id_number,
      },
    });

    if (superAdminFound) {
      return new HttpException(
        `El admin con número de identificación ${superAdmin.id_number} ya está registrado.`,
        HttpStatus.CONFLICT,
      );
    }

    const adminSuperAdminEmailFound = await this.adminRepository.findOne({
      where: {
        corporate_email: superAdmin.corporate_email,
      },
    });

    if (adminSuperAdminEmailFound) {
      return new HttpException(
        `El correo electrónico ${superAdmin.corporate_email} ya está registrado.`,
        HttpStatus.CONFLICT,
      );
    }

    const authenticationMethodEmailFound =
      await this.authenticationMethodRepository.findOne({
        where: {
          name: AuthenticationMethodEnum.EMAIL,
        },
      });

    if (!authenticationMethodEmailFound) {
      return new HttpException(
        `El método de autenticación con Email no existe`,
        HttpStatus.CONFLICT,
      );
    }

    const roleSuperAdminFound = await this.adminRoleRepository.findOne({
      where: {
        name: AdminRolType.SUPER_ADMIN,
      },
    });

    if (!roleSuperAdminFound) {
      throw new HttpException(
        'El rol "Super Admin" no existe.',
        HttpStatus.CONFLICT,
      );
    }

    const insertRoleAdminSuperAdmin = await this.adminRepository.create({
      ...superAdmin,
      admin_role: roleSuperAdminFound.id,
    });

    const adminSuperAdminWithRole = await this.adminRepository.save(
      insertRoleAdminSuperAdmin,
    );

    const adminRoleSuperAdmin = await this.adminRoleRepository.findOne({
      where: {
        id: adminSuperAdminWithRole.admin_role,
        name: AdminRolType.SUPER_ADMIN,
      },
    });

    if (!adminRoleSuperAdmin) {
      throw new HttpException(
        'El usuario debe tener el rol "Super Admin".',
        HttpStatus.CONFLICT,
      );
    }

    await this.adminRepository.update(adminSuperAdminWithRole.id, superAdmin);

    const newAdminSuperAdmin = await this.adminRepository.findOne({
      where: { id: adminSuperAdminWithRole.id },
    });

    return newAdminSuperAdmin;
  }

  async createAdmin(admin: CreateAdminDto) {
    const adminFound = await this.adminRepository.findOne({
      where: {
        id_number: admin.id_number,
      },
    });

    if (adminFound) {
      return new HttpException(
        `El admin con número de identificación ${admin.id_number} ya está registrado.`,
        HttpStatus.CONFLICT,
      );
    }

    const adminAdminEmailFound = await this.adminRepository.findOne({
      where: {
        corporate_email: admin.corporate_email,
      },
    });

    if (adminAdminEmailFound) {
      return new HttpException(
        `El correo electrónico ${admin.corporate_email} ya está registrado.`,
        HttpStatus.CONFLICT,
      );
    }

    const roleAdminFound = await this.adminRoleRepository.findOne({
      where: {
        name: AdminRolType.ADMIN,
      },
    });

    if (!roleAdminFound) {
      throw new HttpException(
        'El rol "Admin" no existe.',
        HttpStatus.NOT_FOUND,
      );
    }

    const adminPositionLevel = await this.positionLevelRepository.findOne({
      where: {
        id: admin.position_level,
      },
    });

    if (!adminPositionLevel) {
      throw new HttpException(
        'El nivel de cargo ingresado no es valido.',
        HttpStatus.CONFLICT,
      );
    }

    const authenticationMethodEmailFound =
      await this.authenticationMethodRepository.findOne({
        where: {
          name: AuthenticationMethodEnum.EMAIL,
        },
      });

    if (!authenticationMethodEmailFound) {
      return new HttpException(
        `El método de autenticación con Email no existe`,
        HttpStatus.CONFLICT,
      );
    }

    const insertRoleAdminInAdmin = await this.adminRepository.create({
      ...admin,
      admin_role: roleAdminFound.id,
      authentication_method: authenticationMethodEmailFound.id,
    });

    const adminInAdminWithRole = await this.adminRepository.save(
      insertRoleAdminInAdmin,
    );

    const adminRoleAdmin = await this.adminRoleRepository.findOne({
      where: {
        id: adminInAdminWithRole.admin_role,
        name: AdminRolType.ADMIN,
      },
    });

    if (!adminRoleAdmin) {
      throw new HttpException(
        'El usuario debe tener el rol "Admin".',
        HttpStatus.CONFLICT,
      );
    }

    await this.adminRepository.update(adminInAdminWithRole.id, admin);

    const newAdminInAdmin = await this.adminRepository.findOne({
      where: { id: adminInAdminWithRole.id },
    });

    return newAdminInAdmin;
  }

  // GET FUNTIONS //

  async getAllAdmins() {
    const adminRoleAdmin = await this.adminRoleRepository.findOne({
      where: {
        name: AdminRolType.ADMIN,
      },
    });

    if (adminRoleAdmin) {
      const allAdmins = await this.adminRepository.find({
        where: {
          role: adminRoleAdmin,
          is_active: true,
        },
        order: {
          name: 'ASC',
        },
      });

      if (!allAdmins.length) {
        return new HttpException(
          `No hay administradores registrados en la base de datos`,
          HttpStatus.NOT_FOUND,
        );
      } else {
        return allAdmins;
      }
    } else {
      throw new HttpException(
        'No hay role creado de "Admin".',
        HttpStatus.CONFLICT,
      );
    }
  }

  async getAdminById(id: number) {
    const adminRoleAdmin = await this.adminRoleRepository.findOne({
      where: {
        name: AdminRolType.ADMIN,
      },
    });

    const adminFound = await this.adminRepository.findOne({
      where: {
        id: id,
        admin_role: adminRoleAdmin.id,
        is_active: true,
      },
    });

    if (!adminFound) {
      return new HttpException(
        `El admin con número de ID: ${id} no esta registrado.`,
        HttpStatus.CONFLICT,
      );
    } else {
      return adminFound;
    }
  }

  async getSuperAdminByIdNumber(idNumber: number) {
    const adminRoleSuperAdmin = await this.adminRoleRepository.findOne({
      where: {
        name: AdminRolType.SUPER_ADMIN,
      },
    });

    const superAdminFound = await this.adminRepository.findOne({
      where: {
        id_number: idNumber,
        admin_role: adminRoleSuperAdmin.id,
        is_active: true,
      },
    });

    if (!superAdminFound) {
      return new HttpException(
        `El admin con número de identificación personal: ${idNumber} no esta registrado.`,
        HttpStatus.CONFLICT,
      );
    } else {
      return superAdminFound;
    }
  }

  async getAdminByIdNumber(idNumber: number) {
    const adminRoleAdmin = await this.adminRoleRepository.findOne({
      where: {
        name: AdminRolType.ADMIN,
      },
    });

    const adminFound = await this.adminRepository.findOne({
      where: {
        id_number: idNumber,
        admin_role: adminRoleAdmin.id,
        is_active: true,
      },
    });

    if (!adminFound) {
      return new HttpException(
        `El admin con número de identificación personal: ${idNumber} no esta registrado.`,
        HttpStatus.CONFLICT,
      );
    } else {
      return adminFound;
    }
  }

  async getAdminFoundByIdNumber(idType: number, idNumber: number) {
    return await this.adminRepository.findOneBy({
      admin_id_type: idType,
      id_number: idNumber,
    });
  }

  async getAdminFoundByIdNumberWithPassword(
    adminIdType: number,
    idNumber: number,
  ) {
    return await this.adminRepository.findOne({
      where: { admin_id_type: adminIdType, id_number: idNumber },
      select: [
        'id',
        'name',
        'admin_id_type',
        'id_number',
        'password',
        'corporate_email',
        'authentication_method',
        'role',
      ],
    });
  }

  async getAdminFoundByIdAndCode(idNumber: number, verificationCode: number) {
    return await this.adminRepository.findOneBy({
      id_number: idNumber,
      verification_code: verificationCode,
      is_active: true,
    });
  }

  // UPDATE FUNTIONS //

  async updateAdmin(id: number, admin: UpdateAdminDto) {
    const adminFound = await this.adminRepository.findOneBy({ id });

    if (!adminFound) {
      return new HttpException(
        `Administrador no encontrado.`,
        HttpStatus.UNAUTHORIZED,
      );
    }

    const adminRoleAdmin = await this.adminRoleRepository.findOne({
      where: {
        name: AdminRolType.ADMIN,
      },
    });

    if (adminFound.admin_role !== adminRoleAdmin.id) {
      return new HttpException(
        `No tienes permiso para actualizar este usuario.`,
        HttpStatus.UNAUTHORIZED,
      );
    }

    if (admin.id_number) {
      const duplicateAdmin = await this.adminRepository.findOne({
        where: {
          id_number: admin.id_number,
        },
      });

      if (duplicateAdmin) {
        return new HttpException(
          `Número de identificación duplicado.`,
          HttpStatus.CONFLICT,
        );
      }
    }

    const updateAdmin = await this.adminRepository.update(id, admin);

    if (updateAdmin.affected === 0) {
      return new HttpException(`Usuario no encontrado.`, HttpStatus.CONFLICT);
    }

    return new HttpException(
      `¡Datos guardados correctamente!`,
      HttpStatus.ACCEPTED,
    );
  }

  async updateAdminPassword(id: number, passwords: UpdatePasswordAdminDto) {
    const adminFound = await this.adminRepository
      .createQueryBuilder('admin')
      .addSelect(['admin.password'])
      .where('admin.id = :id', { id })
      .getOne();

    if (!adminFound) {
      throw new HttpException(
        `Administrador no encontrado.`,
        HttpStatus.UNAUTHORIZED,
      );
    }

    const isPasswordValid = await bcryptjs.compare(
      passwords.oldPassword,
      adminFound.password,
    );

    if (!isPasswordValid) {
      throw new HttpException(
        `Contraseña antigua incorrecta.`,
        HttpStatus.UNAUTHORIZED,
      );
    }

    const isNewPasswordSameAsOld = await bcryptjs.compare(
      passwords.newPassword,
      adminFound.password,
    );

    if (isNewPasswordSameAsOld) {
      throw new HttpException(
        `La nueva contraseña no puede ser igual a la antigua.`,
        HttpStatus.CONFLICT,
      );
    }

    const hashedNewPassword = await bcryptjs.hash(passwords.newPassword, 10);

    await this.adminRepository.update(id, { password: hashedNewPassword });

    return new HttpException(
      `¡Contraseña actualizada correctamente!`,
      HttpStatus.ACCEPTED,
    );
  }

  async forgotAdminPassword({ corporate_email }: ForgotPasswordAdminDto) {
    const adminFound = await this.adminRepository.findOne({
      where: { corporate_email, is_active: true },
    });

    if (adminFound) {
      const resetPasswordToken = nanoid(64);

      await this.adminRepository.update(
        {
          id: adminFound.id,
        },
        { reset_password_token: resetPasswordToken },
      );

      const emailDetailsToSend = new SendEmailDto();

      emailDetailsToSend.recipients = [adminFound.corporate_email];
      emailDetailsToSend.userNameToEmail = adminFound.name;
      emailDetailsToSend.subject = PASSWORD_RESET;
      emailDetailsToSend.emailTemplate = RESET_PASSWORD_TEMPLATE;
      emailDetailsToSend.resetPasswordUrl = `${process.env.RESET_PASSWORD_URL}?token=${resetPasswordToken}`;

      await this.nodemailerService.sendEmail(emailDetailsToSend);

      schedule.scheduleJob(new Date(Date.now() + 5 * 60 * 1000), async () => {
        await this.adminRepository.update(
          { id: adminFound.id },
          { reset_password_token: null },
        );
      });

      const maskedEmail = maskEmailAdmin(adminFound.corporate_email);

      return new HttpException(
        `Se ha enviado al correo: ${maskedEmail} el link de restablecimiento de contraseña`,
        HttpStatus.ACCEPTED,
      );
    } else {
      throw new UnauthorizedException(`¡Datos ingresados incorrectos!`);
    }
  }

  async resetAdminPassword(
    token: string,
    { new_password }: ResetPasswordAdminDto,
  ) {
    const tokenFound = await this.adminRepository.findOne({
      where: {
        reset_password_token: token,
      },
    });

    if (!tokenFound) {
      throw new UnauthorizedException('¡Link invalido o caducado!');
    }

    const adminFound = await this.adminRepository.findOneBy({
      id: tokenFound.id,
    });

    if (!adminFound) {
      throw new UnauthorizedException('Admin no encontrado!');
    }

    const hashedNewPassword = await bcryptjs.hash(new_password, 10);

    await this.adminRepository.update(adminFound.id, {
      password: hashedNewPassword,
      reset_password_token: null,
    });

    return new HttpException(
      `¡Contraseña restablecida correctamente!`,
      HttpStatus.ACCEPTED,
    );
  }

  // DELETED-BAN FUNTIONS //

  async banAdmins(id: number) {
    const adminFound = await this.adminRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!adminFound) {
      return new HttpException(
        `El admin con número de ID: ${id} no esta registrado.`,
        HttpStatus.CONFLICT,
      );
    }

    const adminRoleAdmin = await this.adminRoleRepository.findOne({
      where: {
        name: AdminRolType.ADMIN,
      },
    });

    if (adminFound.admin_role !== adminRoleAdmin.id) {
      return new HttpException(
        `No tienes permiso para actualizar este usuario.`,
        HttpStatus.UNAUTHORIZED,
      );
    }

    adminFound.is_active = !adminFound.is_active;

    await this.adminRepository.save(adminFound);

    return new HttpException(
      `El admin con número de identidad: ${adminFound.id_number} está con estado activo: ${adminFound.is_active}`,
      HttpStatus.CONFLICT,
    );
  }
}
