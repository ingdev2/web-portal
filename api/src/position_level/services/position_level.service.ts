import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePositionLevelDto } from '../dto/create-position_level.dto';
import { UpdatePositionLevelDto } from '../dto/update-position_level.dto';
import { PositionLevel } from '../entities/position_level.entity';

@Injectable()
export class PositionLevelService {
  constructor(
    @InjectRepository(PositionLevel)
    private positionLevelRepository: Repository<PositionLevel>,
  ) {}

  // CREATE FUNTIONS //

  async createPositionLevel(positionLevel: CreatePositionLevelDto) {
    const positionLevelFound = await this.positionLevelRepository.findOne({
      where: {
        name: positionLevel.name,
      },
    });

    if (positionLevelFound) {
      return new HttpException(
        `El nivel de cargo con nombre: ${positionLevel.name} ya está registrado.`,
        HttpStatus.CONFLICT,
      );
    }

    const newPositionLevel =
      await this.positionLevelRepository.create(positionLevel);

    return await this.positionLevelRepository.save(newPositionLevel);
  }

  // GET FUNTIONS //

  async getAllPositionLevel() {
    const allPositionLevel = await this.positionLevelRepository.find({
      order: {
        id: 'ASC',
      },
    });

    if (allPositionLevel.length === 0) {
      return new HttpException(
        `No hay niveles de cargo registrados en la base de datos`,
        HttpStatus.CONFLICT,
      );
    } else {
      return allPositionLevel;
    }
  }

  // UPDATE FUNTIONS //

  async updatePositionLevel(id: number, positionLevel: UpdatePositionLevelDto) {
    const positionLevelFound = await this.positionLevelRepository.findOneBy({
      id,
    });

    if (!positionLevelFound) {
      return new HttpException(
        `Nivel de cargo no encontrado.`,
        HttpStatus.UNAUTHORIZED,
      );
    }

    if (positionLevel.name) {
      const duplicatePositionLevel = await this.positionLevelRepository.findOne(
        {
          where: {
            name: positionLevel.name,
          },
        },
      );

      if (duplicatePositionLevel) {
        return new HttpException(
          `Nivel de cargo duplicado.`,
          HttpStatus.CONFLICT,
        );
      }
    }

    const updatePositionLevel = await this.positionLevelRepository.update(
      id,
      positionLevel,
    );

    if (updatePositionLevel.affected === 0) {
      return new HttpException(
        `Nivel de cargo no encontrado.`,
        HttpStatus.CONFLICT,
      );
    }

    return new HttpException(
      `¡Datos guardados correctamente!`,
      HttpStatus.ACCEPTED,
    );
  }
}
