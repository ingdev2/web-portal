import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateIdTypeDto } from '../dto/create-id_type.dto';
import { UpdateIdTypeDto } from '../dto/update-id_type.dto';
import { IdTypeEntity } from '../entities/id_type.entity';

@Injectable()
export class IdTypesService {
  constructor(
    @InjectRepository(IdTypeEntity)
    private idTypeRepository: Repository<IdTypeEntity>,
  ) {}

  // CREATE FUNTIONS //

  async createIdType(idType: CreateIdTypeDto) {
    const idTypeFound = await this.idTypeRepository.findOne({
      where: {
        name: idType.name,
      },
    });

    if (idTypeFound) {
      return new HttpException(
        `El tipo de id: ${idType.name} ya está registrado.`,
        HttpStatus.CONFLICT,
      );
    }

    const newIdType = await this.idTypeRepository.create(idType);

    return await this.idTypeRepository.save(newIdType);
  }

  // GET FUNTIONS //

  async getAllIdTypes() {
    const allIdTypes = await this.idTypeRepository.find({
      order: {
        id: 'ASC',
      },
    });

    if (allIdTypes.length === 0) {
      return new HttpException(
        `No hay tipos de id registrados en la base de datos`,
        HttpStatus.CONFLICT,
      );
    } else {
      return allIdTypes;
    }
  }

  // UPDATE FUNTIONS //

  async updateIdType(id: number, idType: UpdateIdTypeDto) {
    const idTypeFound = await this.idTypeRepository.findOneBy({ id });

    if (!idTypeFound) {
      return new HttpException(
        `Tipo de id no encontrado.`,
        HttpStatus.UNAUTHORIZED,
      );
    }

    if (idType.name) {
      const duplicateIdType = await this.idTypeRepository.findOne({
        where: {
          name: idType.name,
        },
      });

      if (duplicateIdType) {
        return new HttpException(`Tipo de id duplicado.`, HttpStatus.CONFLICT);
      }
    }

    const updateIdType = await this.idTypeRepository.update(id, idType);

    if (updateIdType.affected === 0) {
      return new HttpException(
        `Tipo de id no encontrado.`,
        HttpStatus.CONFLICT,
      );
    }

    return new HttpException(
      `¡Datos guardados correctamente!`,
      HttpStatus.ACCEPTED,
    );
  }
}
