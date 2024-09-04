import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserRoleDto } from '../dto/create-user_role.dto';
import { UpdateUserRoleDto } from '../dto/update-user_role.dto';
import { UserRole } from '../entities/user_role.entity';

@Injectable()
export class UserRolesService {
  constructor(
    @InjectRepository(UserRole)
    private userRoleRepository: Repository<UserRole>,
  ) {}

  // CREATE FUNTIONS //

  async createUserRole(userRole: CreateUserRoleDto) {
    const userRoleFound = await this.userRoleRepository.findOne({
      where: {
        name: userRole.name,
      },
    });

    if (userRoleFound) {
      return new HttpException(
        `El role de usuario: ${userRole.name} ya está registrado.`,
        HttpStatus.CONFLICT,
      );
    }

    const newUserRole = await this.userRoleRepository.create(userRole);

    return await this.userRoleRepository.save(newUserRole);
  }

  // GET FUNTIONS //

  async getAllUserRoles() {
    const allUserRoles = await this.userRoleRepository.find({
      order: {
        id: 'ASC',
      },
    });

    if (allUserRoles.length === 0) {
      return new HttpException(
        `No hay roles de usuario registrados en la base de datos`,
        HttpStatus.CONFLICT,
      );
    } else {
      return allUserRoles;
    }
  }

  // UPDATE FUNTIONS //

  async updateUserRole(id: number, userRole: UpdateUserRoleDto) {
    const userRoleFound = await this.userRoleRepository.findOneBy({ id });

    if (!userRoleFound) {
      return new HttpException(
        `Role de usuario no encontrado.`,
        HttpStatus.UNAUTHORIZED,
      );
    }

    if (userRole.name) {
      const duplicateUserRole = await this.userRoleRepository.findOne({
        where: {
          name: userRole.name,
        },
      });

      if (duplicateUserRole) {
        return new HttpException(
          `Nombre de role de usuario duplicado.`,
          HttpStatus.CONFLICT,
        );
      }
    }

    const updateUserRole = await this.userRoleRepository.update(id, userRole);

    if (updateUserRole.affected === 0) {
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
