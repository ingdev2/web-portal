import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGenderTypeDto } from '../dto/create-gender.dto';
import { UpdateGenderTypeDto } from '../dto/update-gender.dto';
import { GenderType } from '../entities/gender.entity';

@Injectable()
export class GenderTypeService {
  constructor(
    @InjectRepository(GenderType)
    private genderTypeRepository: Repository<GenderType>,
  ) {}

  // CREATE FUNTIONS //

  async createGenderType(genderType: CreateGenderTypeDto) {
    const genderTypeFound = await this.genderTypeRepository.findOne({
      where: {
        name: genderType.name,
      },
    });

    if (genderTypeFound) {
      return new HttpException(
        `El tipo de género: ${genderType.name} ya está registrado.`,
        HttpStatus.CONFLICT,
      );
    }

    const newGenderType = await this.genderTypeRepository.create(genderType);

    return await this.genderTypeRepository.save(newGenderType);
  }

  // GET FUNTIONS //

  async getAllGenderTypes() {
    const allGenderTypes = await this.genderTypeRepository.find({
      order: {
        id: 'ASC',
      },
    });

    if (allGenderTypes.length === 0) {
      return new HttpException(
        `No hay tipos de géneros registrados en la base de datos`,
        HttpStatus.CONFLICT,
      );
    } else {
      return allGenderTypes;
    }
  }

  // UPDATE FUNTIONS //

  async updateGenderType(id: number, genderType: UpdateGenderTypeDto) {
    const genderTypeFound = await this.genderTypeRepository.findOneBy({ id });

    if (!genderTypeFound) {
      return new HttpException(
        `Tipo de género no encontrado.`,
        HttpStatus.UNAUTHORIZED,
      );
    }

    if (genderType.name) {
      const duplicateGenderType = await this.genderTypeRepository.findOne({
        where: {
          name: genderType.name,
        },
      });

      if (duplicateGenderType) {
        return new HttpException(
          `Tipo de género duplicado.`,
          HttpStatus.CONFLICT,
        );
      }
    }

    const updateGenderType = await this.genderTypeRepository.update(
      id,
      genderType,
    );

    if (updateGenderType.affected === 0) {
      return new HttpException(
        `Tipo de género no encontrado.`,
        HttpStatus.CONFLICT,
      );
    }

    return new HttpException(
      `¡Datos guardados correctamente!`,
      HttpStatus.ACCEPTED,
    );
  }
}
