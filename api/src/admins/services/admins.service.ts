import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from '../entities/admin.entity';
import { AdminRolType } from '../../common/enums/admin_roles.enum';
import { CreateSuperAdminDto } from '../dto/create_super_admin.dto';
import { CreateAdminDto } from '../dto/create_admin.dto';
import { UpdateAdminDto } from '../dto/update_admin.dto';
import { AdminRole } from '../../admin_roles/entities/admin_role.entity';

import * as bcryptjs from 'bcryptjs';

@Injectable()
export class AdminsService {
  constructor(
    @InjectRepository(Admin) private adminRepository: Repository<Admin>,
    @InjectRepository(AdminRole)
    private adminRoleRepository: Repository<AdminRole>,
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

    const roleSuperAdminFound = await this.adminRoleRepository.findOne({
      where: {
        name: AdminRolType.SUPER_ADMIN,
      },
    });

    if (!roleSuperAdminFound) {
      throw new HttpException(
        'El rol "Super Admin" no existe.',
        HttpStatus.INTERNAL_SERVER_ERROR,
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
        HttpStatus.INTERNAL_SERVER_ERROR,
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

    const roleAdminFound = await this.adminRoleRepository.findOne({
      where: {
        name: AdminRolType.ADMIN,
      },
    });

    if (!roleAdminFound) {
      throw new HttpException(
        'El rol "Admin" no existe.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const insertRoleAdminInAdmin = await this.adminRepository.create({
      ...admin,
      admin_role: roleAdminFound.id,
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
        HttpStatus.INTERNAL_SERVER_ERROR,
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
          HttpStatus.CONFLICT,
        );
      } else {
        return allAdmins;
      }
    } else {
      throw new HttpException(
        'No hay role creado de "Admin".',
        HttpStatus.INTERNAL_SERVER_ERROR,
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

  async getAdminFoundByIdNumber(idNumber: number) {
    return await this.adminRepository.findOneBy({ id_number: idNumber });
  }

  async getAdminFoundByIdNumberWithPassword(idNumber: number) {
    return await this.adminRepository.findOne({
      where: { id_number: idNumber },
      select: ['id', 'name', 'id_number', 'password', 'role'],
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

    if (admin.password) {
      admin.password = await bcryptjs.hash(admin.password, 10);
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
