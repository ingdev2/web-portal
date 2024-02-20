import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRolType } from '../entities/user.entity';
import { CreateUserPersonDto } from '../dto/create_user_person.dto';
import { UpdateUserPersonDto } from '../dto/update_user_person.dto';
import { CreateUserEpsDto } from '../dto/create_user_eps.dto';
import { UpdateUserEpsDto } from '../dto/update_user_eps.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
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

    const newUserPerson = await this.userRepository.create(userPerson);

    if (newUserPerson.role !== 'Persona') {
      throw new HttpException(
        'El usuario debe tener el rol "Persona".',
        HttpStatus.CONFLICT,
      );
    }

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

    const newUserEps = await this.userRepository.create(userEps);

    if (newUserEps.role !== 'Eps') {
      throw new HttpException(
        'El usuario debe tener el rol "Eps".',
        HttpStatus.CONFLICT,
      );
    }

    return await this.userRepository.save(newUserEps);
  }

  // GET FUNTIONS //

  async getAllUsersPerson() {
    const allUsersPerson = await this.userRepository.find({
      where: {
        role: UserRolType.PERSON,
        is_active: true,
      },
      order: {
        name: 'ASC',
      },
    });

    if (allUsersPerson.length == 0) {
      return new HttpException(
        `No hay usuarios registrados en la base de datos`,
        HttpStatus.CONFLICT,
      );
    } else {
      return allUsersPerson;
    }
  }

  async getAllUsersEps() {
    const allUsersEps = await this.userRepository.find({
      where: {
        role: UserRolType.EPS,
        is_active: true,
      },
      order: {
        name: 'ASC',
      },
    });

    if (allUsersEps.length == 0) {
      return new HttpException(
        `No hay usuarios registrados en la base de datos`,
        HttpStatus.CONFLICT,
      );
    } else {
      return allUsersEps;
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

  // UPDATE FUNTIONS //

  async updateUserPerson(id: string, userPerson: UpdateUserPersonDto) {
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
