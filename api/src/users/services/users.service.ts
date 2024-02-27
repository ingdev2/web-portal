import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UserRolType } from '../../common/enums/user_roles.enum';
import { CreateUserPersonDto } from '../dto/create_user_person.dto';
import { UpdateUserPersonDto } from '../dto/update_user_person.dto';
import { CreateUserEpsDto } from '../dto/create_user_eps.dto';
import { UpdateUserEpsDto } from '../dto/update_user_eps.dto';
import { UserRole } from '../../user_roles/entities/user_role.entity';

import * as bcryptjs from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(UserRole)
    private userRoleRepository: Repository<UserRole>,
  ) {}

  // CREATE FUNTIONS //

  async createUserPerson(userPerson: CreateUserPersonDto) {
    const userPersonFound = await this.userRepository.findOne({
      where: {
        id_number: userPerson.id_number,
      },
    });

    if (userPersonFound) {
      return new HttpException(
        `El usuario con número de identificación ${userPerson.id_number} ya está registrado.`,
        HttpStatus.CONFLICT,
      );
    }

    const userRolePerson = await this.userRoleRepository.findOne({
      where: {
        id: userPerson.user_role,
        name: UserRolType.PERSON,
      },
    });

    if (!userRolePerson) {
      throw new HttpException(
        'El usuario debe tener el rol "Persona".',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const newUserPerson = await this.userRepository.create(userPerson);

    return await this.userRepository.save(newUserPerson);
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

    const userRoleEps = await this.userRoleRepository.findOne({
      where: {
        id: userEps.user_role,
        name: UserRolType.EPS,
      },
    });

    if (!userRoleEps) {
      throw new HttpException(
        'El usuario debe tener el rol "Eps".',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const newUserEps = await this.userRepository.create(userEps);

    return await this.userRepository.save(newUserEps);
  }

  // GET FUNTIONS //

  async getAllUsersPerson() {
    const userRolePerson = await this.userRoleRepository.findOne({
      where: {
        name: UserRolType.PERSON,
      },
    });

    if (userRolePerson) {
      const allUsersPerson = await this.userRepository.find({
        where: {
          role: userRolePerson,
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
        'No hay role creado de "Persona".',
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

  async getUsersByIdNumber(idNumber: number) {
    const userFound = await this.userRepository.findOne({
      where: {
        id_number: idNumber,
        is_active: true,
      },
    });

    if (!userFound) {
      return new HttpException(
        `El usuario con número de identificación personal: ${idNumber} no esta registrado.`,
        HttpStatus.CONFLICT,
      );
    } else {
      return userFound;
    }
  }

  async getUserFoundByIdNumber(idNumber: number) {
    return await this.userRepository.findOneBy({ id_number: idNumber });
  }

  async getUserFoundByIdNumberWithPassword(idNumber: number) {
    return await this.userRepository.findOne({
      where: { id_number: idNumber },
      select: ['id', 'name', 'id_number', 'password', 'role'],
    });
  }

  // UPDATE FUNTIONS //

  async updateUserPerson(id: string, userPerson: UpdateUserPersonDto) {
    const userFound = await this.userRepository.findOneBy({ id });

    if (!userFound) {
      return new HttpException(
        `Usuario no encontrado.`,
        HttpStatus.UNAUTHORIZED,
      );
    }

    const userRolePerson = await this.userRoleRepository.findOne({
      where: {
        name: UserRolType.PERSON,
      },
    });

    if (userFound.user_role !== userRolePerson.id) {
      return new HttpException(
        `No tienes permiso para actualizar este usuario.`,
        HttpStatus.UNAUTHORIZED,
      );
    }

    if (userPerson.id_number) {
      const duplicateUserPerson = await this.userRepository.findOne({
        where: {
          id_number: userPerson.id_number,
        },
      });

      if (duplicateUserPerson) {
        return new HttpException(
          `Número de identificación duplicado.`,
          HttpStatus.CONFLICT,
        );
      }
    }

    if (userPerson.password) {
      userPerson.password = await bcryptjs.hash(userPerson.password, 10);
    }

    const updateUserPerson = await this.userRepository.update(id, userPerson);

    if (updateUserPerson.affected === 0) {
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

    if (userEps.id_number) {
      const duplicateUserEps = await this.userRepository.findOne({
        where: {
          id_number: userEps.id_number,
        },
      });

      if (duplicateUserEps) {
        return new HttpException(
          `Número de identificación duplicado.`,
          HttpStatus.CONFLICT,
        );
      }
    }

    if (userEps.password) {
      userEps.password = await bcryptjs.hash(userEps.password, 10);
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
