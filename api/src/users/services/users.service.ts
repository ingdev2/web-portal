import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRolType } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserPersonDto } from '../dto/create_user_person.dto';
import { UpdateUserPersonDto } from '../dto/update_user_person.dto';
import { CreateUserEpsDto } from '../dto/create_user_eps.dto';
import { UpdateUserEpsDto } from '../dto/update_user_eps.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

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

    if (userEps.rol !== 'Eps') {
      throw new HttpException(
        'El usuario debe tener el rol "Eps".',
        HttpStatus.CONFLICT,
      );
    }

    const newUserEps = await this.userRepository.create(userEps);
    return await this.userRepository.save(newUserEps);
  }

  async getUsersPerson() {
    const allUsersPerson = await this.userRepository.find({
      where: {
        rol: UserRolType.PERSON,
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

  async getUsersEps() {
    const allUsersEps = await this.userRepository.find({
      where: {
        rol: UserRolType.EPS,
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

  async getUserPersonByIdNumber(id_number: number) {
    const userPersonFound = await this.userRepository.findOne({
      where: {
        id_number: id_number,
        rol: UserRolType.PERSON,
      },
    });

    if (!userPersonFound) {
      return new HttpException(
        `El usuario con número de identificación: ${id_number} no esta registrado.`,
        HttpStatus.CONFLICT,
      );
    } else {
      return userPersonFound;
    }
  }

  async getUserEpsByIdNumber(id_number: number) {
    const userEpsFound = await this.userRepository.findOne({
      where: {
        id_number: id_number,
        rol: UserRolType.EPS,
      },
    });

    if (!userEpsFound) {
      return new HttpException(
        `El usuario con número de identificación: ${id_number} no esta registrado.`,
        HttpStatus.CONFLICT,
      );
    } else {
      return userEpsFound;
    }
  }

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

  async banUserPerson(id: string) {
    const userPersonFound = await this.userRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!userPersonFound) {
      return new HttpException(
        `El usuario con número de Id: ${id} no esta registrado.`,
        HttpStatus.CONFLICT,
      );
    }

    userPersonFound.is_active = !userPersonFound.is_active;

    await this.userRepository.save(userPersonFound);

    return new HttpException(
      `El usuario con número de identidad: ${userPersonFound.id_number} está con estado activo: ${userPersonFound.is_active}`,
      HttpStatus.CONFLICT,
    );
  }

  async banUserEps(id: string) {
    const userEpsFound = await this.userRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!userEpsFound) {
      return new HttpException(
        `El usuario con número de Id: ${id} no esta registrado.`,
        HttpStatus.CONFLICT,
      );
    }

    userEpsFound.is_active = !userEpsFound.is_active;

    await this.userRepository.save(userEpsFound);

    return new HttpException(
      `El usuario con número de identidad: ${userEpsFound.id_number} está con estado activo: ${userEpsFound.is_active}`,
      HttpStatus.CONFLICT,
    );
  }
}
