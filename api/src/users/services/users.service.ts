import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserPersonDto } from '../dto/create_user_person.dto';
import { UpdateUserPersonDto } from '../dto/update_user_person.dto';

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

  async getUsersPerson() {
    const allUsersPerson = await this.userRepository.find();

    if (allUsersPerson.length == 0) {
      return new HttpException(
        `No hay usuarios registrados en la base de datos`,
        HttpStatus.CONFLICT,
      );
    } else {
      return allUsersPerson;
    }
  }

  async getUserByIdNumber(id_number: number) {
    const userPersonFound = await this.userRepository.findOne({
      where: {
        id_number: id_number,
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

  async updateUserPerson(id: string, user: UpdateUserPersonDto) {
    const updateUser = await this.userRepository.update(id, user);

    if (updateUser.affected === 0) {
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
}
