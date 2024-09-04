import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAdminRoleDto } from '../dto/create-admin_role.dto';
import { UpdateAdminRoleDto } from '../dto/update-admin_role.dto';
import { AdminRole } from '../entities/admin_role.entity';
import { AdminRolType } from 'src/utils/enums/admin_roles.enum';

@Injectable()
export class AdminRolesService {
  constructor(
    @InjectRepository(AdminRole)
    private adminRoleRepository: Repository<AdminRole>,
  ) {}

  // CREATE FUNTIONS //

  async createAdminRole(adminRole: CreateAdminRoleDto) {
    const adminRoleFound = await this.adminRoleRepository.findOne({
      where: {
        name: adminRole.name,
      },
    });

    if (adminRoleFound) {
      return new HttpException(
        `El role de administrador: ${adminRole.name} ya está registrado.`,
        HttpStatus.CONFLICT,
      );
    }

    const newAdminRole = await this.adminRoleRepository.create(adminRole);

    return await this.adminRoleRepository.save(newAdminRole);
  }

  // GET FUNTIONS //

  async getAllAdminRoles() {
    const allAdminRoles = await this.adminRoleRepository.find({
      order: {
        id: 'ASC',
      },
    });

    if (allAdminRoles.length === 0) {
      return new HttpException(
        `No hay roles de administradores registrados en la base de datos`,
        HttpStatus.CONFLICT,
      );
    } else {
      return allAdminRoles;
    }
  }

  async getAdminRoleByName(name?: AdminRolType) {
    if (name) {
      const adminRoleName = await this.adminRoleRepository.findOne({
        where: { name: name },
      });

      if (!adminRoleName) {
        throw new HttpException(
          `El role "${name}" de administradores no existe`,
          HttpStatus.NOT_FOUND,
        );
      }

      return adminRoleName;
    }
  }

  // UPDATE FUNTIONS //

  async updateAdminRole(id: number, adminRole: UpdateAdminRoleDto) {
    const adminRoleFound = await this.adminRoleRepository.findOneBy({ id });

    if (!adminRoleFound) {
      return new HttpException(
        `Role de administrador no encontrado.`,
        HttpStatus.UNAUTHORIZED,
      );
    }

    if (adminRole.name) {
      const duplicateAdminRole = await this.adminRoleRepository.findOne({
        where: {
          name: adminRole.name,
        },
      });

      if (duplicateAdminRole) {
        return new HttpException(
          `Nombre de role de administrador duplicado.`,
          HttpStatus.CONFLICT,
        );
      }
    }

    const updateAdminRole = await this.adminRoleRepository.update(
      id,
      adminRole,
    );

    if (updateAdminRole.affected === 0) {
      return new HttpException(
        `Role de usuario no encontrado.`,
        HttpStatus.CONFLICT,
      );
    }

    return new HttpException(
      `¡Datos guardados correctamente!`,
      HttpStatus.ACCEPTED,
    );
  }
}
