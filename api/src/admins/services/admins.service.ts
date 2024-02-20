import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from '../entities/admin.entity';
import { AdminRolType } from '../../common/enums/admin_roles.enum';
import { Repository } from 'typeorm';
import { CreateAdminDto } from '../dto/create_admin.dto';
import { CreateSuperAdminDto } from '../dto/create_super_admin.dto';
import { UpdateAdminDto } from '../dto/update_admin.dto';

@Injectable()
export class AdminsService {
  constructor(
    @InjectRepository(Admin) private adminRepository: Repository<Admin>,
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

    const newSuperAdmin = await this.adminRepository.create(superAdmin);

    if (newSuperAdmin.role !== 'Super Admin') {
      throw new HttpException(
        'El admin debe tener el rol "Super Admin".',
        HttpStatus.CONFLICT,
      );
    }

    return await this.adminRepository.save(newSuperAdmin);
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

    const newAdmin = await this.adminRepository.create(admin);

    if (newAdmin.role !== 'Admin') {
      throw new HttpException(
        'El admin debe tener el rol "Admin".',
        HttpStatus.CONFLICT,
      );
    }

    return await this.adminRepository.save(newAdmin);
  }

  // GET FUNTIONS //

  async getAllAdmins() {
    const allAdmins = await this.adminRepository.find({
      where: {
        role: AdminRolType.ADMIN,
        is_active: true,
      },
      order: {
        name: 'ASC',
      },
    });

    if (allAdmins.length == 0) {
      return new HttpException(
        `No hay admins registrados en la base de datos`,
        HttpStatus.CONFLICT,
      );
    } else {
      return allAdmins;
    }
  }

  async getAdminById(id: number) {
    const adminFound = await this.adminRepository.findOne({
      where: {
        id: id,
        role: AdminRolType.ADMIN,
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
    const superAdminFound = await this.adminRepository.findOne({
      where: {
        id_number: idNumber,
        role: AdminRolType.SUPER_ADMIN,
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
    const adminFound = await this.adminRepository.findOne({
      where: {
        id_number: idNumber,
        role: AdminRolType.ADMIN,
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
    const updateAdmin = await this.adminRepository.update(id, admin);

    if (updateAdmin.affected === 0) {
      return new HttpException(`Usuario no encontrado`, HttpStatus.CONFLICT);
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
        role: AdminRolType.ADMIN,
      },
    });

    if (!adminFound) {
      return new HttpException(
        `El admin con número de ID: ${id} no esta registrado.`,
        HttpStatus.CONFLICT,
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
