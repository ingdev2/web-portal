import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRequirementStatusDto } from '../dto/create-requirement_status.dto';
import { UpdateRequirementStatusDto } from '../dto/update-requirement_status.dto';
import { RequirementStatus } from '../entities/requirement_status.entity';

@Injectable()
export class RequirementStatusService {
  constructor(
    @InjectRepository(RequirementStatus)
    private requirementStatusRepository: Repository<RequirementStatus>,
  ) {}

  // CREATE FUNTIONS //

  async createRequirementStatus(requirementStatus: CreateRequirementStatusDto) {
    const requirementStatusFound =
      await this.requirementStatusRepository.findOne({
        where: {
          name: requirementStatus.name,
        },
      });

    if (requirementStatusFound) {
      return new HttpException(
        `El estado de requerimiento: ${requirementStatus.name} ya está registrado.`,
        HttpStatus.CONFLICT,
      );
    }

    const newRequirementStatus =
      await this.requirementStatusRepository.create(requirementStatus);

    return await this.requirementStatusRepository.save(newRequirementStatus);
  }

  // GET FUNTIONS //

  async getAllRequirementStatus() {
    const allRequirementStatus = await this.requirementStatusRepository.find({
      order: {
        id: 'ASC',
      },
    });

    if (allRequirementStatus.length === 0) {
      return new HttpException(
        `No hay estados de requerimientos registrados en la base de datos`,
        HttpStatus.CONFLICT,
      );
    } else {
      return allRequirementStatus;
    }
  }

  async getRequirementStatusById(id: number) {
    const requirementStatus = await this.requirementStatusRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!requirementStatus) {
      return new HttpException(
        `No hay estado de requerimiento creado con el id dado`,
        HttpStatus.CONFLICT,
      );
    } else {
      return requirementStatus;
    }
  }

  // UPDATE FUNTIONS //

  async updateRequirementStatus(
    id: number,
    requirementStatus: UpdateRequirementStatusDto,
  ) {
    const requirementStatusFound =
      await this.requirementStatusRepository.findOneBy({
        id,
      });

    if (!requirementStatusFound) {
      return new HttpException(
        `Estado de requerimiento no encontrado.`,
        HttpStatus.UNAUTHORIZED,
      );
    }

    if (requirementStatus.name) {
      const duplicateRequirementStatus =
        await this.requirementStatusRepository.findOne({
          where: {
            name: requirementStatus.name,
          },
        });

      if (duplicateRequirementStatus) {
        return new HttpException(
          `Estado de requerimiento duplicado.`,
          HttpStatus.CONFLICT,
        );
      }
    }

    const updateRequirementStatus =
      await this.requirementStatusRepository.update(id, requirementStatus);

    if (updateRequirementStatus.affected === 0) {
      return new HttpException(
        `Estado de requerimiento no encontrado.`,
        HttpStatus.CONFLICT,
      );
    }

    return new HttpException(
      `¡Datos guardados correctamente!`,
      HttpStatus.ACCEPTED,
    );
  }
}
