import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAuthenticationMethodDto } from '../dto/create-authentication_method.dto';
import { UpdateAuthenticationMethodDto } from '../dto/update-authentication_method.dto';
import { AuthenticationMethod } from '../entities/authentication_method.entity';

@Injectable()
export class AuthenticationMethodService {
  constructor(
    @InjectRepository(AuthenticationMethod)
    private authenticationMethodRepository: Repository<AuthenticationMethod>,
  ) {}

  // CREATE FUNTIONS //

  async createAuthenticationMethod(
    authenticationMethod: CreateAuthenticationMethodDto,
  ) {
    const authenticationMethodFound =
      await this.authenticationMethodRepository.findOne({
        where: {
          name: authenticationMethod.name,
        },
      });

    if (authenticationMethodFound) {
      return new HttpException(
        `El método de autenticación: ${authenticationMethod.name} ya está registrado.`,
        HttpStatus.CONFLICT,
      );
    }

    const newAuthenticationMethod =
      await this.authenticationMethodRepository.create(authenticationMethod);

    return await this.authenticationMethodRepository.save(
      newAuthenticationMethod,
    );
  }

  // GET FUNTIONS //

  async getAllAuthenticationMethods() {
    const allAuthenticationMethods =
      await this.authenticationMethodRepository.find({
        order: {
          id: 'ASC',
        },
      });

    if (allAuthenticationMethods.length === 0) {
      return new HttpException(
        `No hay métodos de autenticación registrados en la base de datos`,
        HttpStatus.CONFLICT,
      );
    } else {
      return allAuthenticationMethods;
    }
  }

  // UPDATE FUNTIONS //

  async updateAuthenticationMethod(
    id: number,
    authenticationMethod: UpdateAuthenticationMethodDto,
  ) {
    const authenticationMethodFound =
      await this.authenticationMethodRepository.findOneBy({ id });

    if (!authenticationMethodFound) {
      return new HttpException(
        `Método de autenticación no encontrado.`,
        HttpStatus.UNAUTHORIZED,
      );
    }

    if (authenticationMethod.name) {
      const duplicateAuthenticationMethod =
        await this.authenticationMethodRepository.findOne({
          where: {
            name: authenticationMethod.name,
          },
        });

      if (duplicateAuthenticationMethod) {
        return new HttpException(
          `Método de autenticación duplicado.`,
          HttpStatus.CONFLICT,
        );
      }
    }

    const updateAuthenticationMethod =
      await this.authenticationMethodRepository.update(
        id,
        authenticationMethod,
      );

    if (updateAuthenticationMethod.affected === 0) {
      return new HttpException(
        `Método de autenticación no encontrado.`,
        HttpStatus.CONFLICT,
      );
    }

    return new HttpException(
      `¡Datos guardados correctamente!`,
      HttpStatus.ACCEPTED,
    );
  }
}
