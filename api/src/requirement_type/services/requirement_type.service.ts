import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRequirementTypeDto } from '../dto/create-requirement_type.dto';
import { UpdateRequirementTypeDto } from '../dto/update-requirement_type.dto';
import { RequirementType } from '../entities/requirement_type.entity';

@Injectable()
export class RequirementTypeService {
  constructor(
    @InjectRepository(RequirementType)
    private requirementTypeRepository: Repository<RequirementType>,
  ) {}

  // CREATE FUNTIONS //

  async createRequirementType(requirementType: CreateRequirementTypeDto) {
    const requirementTypeFound = await this.requirementTypeRepository.findOne({
      where: {
        name: requirementType.name,
      },
    });

    if (requirementTypeFound) {
      return new HttpException(
        `El tipo de requerimiento: ${requirementType.name} ya está registrado.`,
        HttpStatus.CONFLICT,
      );
    }

    const newRequirementType =
      await this.requirementTypeRepository.create(requirementType);

    return await this.requirementTypeRepository.save(newRequirementType);
  }

  // GET FUNTIONS //

  async getAllRequirementType() {
    const allRequirementTypes = await this.requirementTypeRepository.find({
      where: {
        is_active: true,
      },
      order: {
        id: 'ASC',
      },
    });

    if (allRequirementTypes.length === 0) {
      return new HttpException(
        `No hay tipos de requerimientos registrados en la base de datos`,
        HttpStatus.CONFLICT,
      );
    } else {
      return allRequirementTypes;
    }
  }

  async getAllRequirementTypeAdminDashboard() {
    const allRequirementTypes = await this.requirementTypeRepository.find({
      order: {
        id: 'ASC',
      },
    });

    if (allRequirementTypes.length === 0) {
      return new HttpException(
        `No hay tipos de requerimientos registrados en la base de datos`,
        HttpStatus.CONFLICT,
      );
    } else {
      return allRequirementTypes;
    }
  }

  async getRequirementTypeById(id: number) {
    const requirementType = await this.requirementTypeRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!requirementType) {
      return new HttpException(
        `No hay requerimientos registrados con el id dado`,
        HttpStatus.CONFLICT,
      );
    } else {
      return requirementType;
    }
  }

  // UPDATE FUNTIONS //

  async updateRequirementType(
    id: number,
    requirementType: UpdateRequirementTypeDto,
  ) {
    const requirementTypeFound = await this.requirementTypeRepository.findOneBy(
      {
        id,
      },
    );

    if (!requirementTypeFound) {
      return new HttpException(
        `Tipo de requerimiento no encontrado.`,
        HttpStatus.UNAUTHORIZED,
      );
    }

    if (requirementType.name) {
      const duplicateRequirementType =
        await this.requirementTypeRepository.findOne({
          where: {
            name: requirementType.name,
          },
        });

      if (duplicateRequirementType) {
        return new HttpException(
          `Nombre de tipo de requerimiento duplicado.`,
          HttpStatus.CONFLICT,
        );
      }
    }

    const updateRequirementType = await this.requirementTypeRepository.update(
      id,
      requirementType,
    );

    if (updateRequirementType.affected === 0) {
      return new HttpException(
        `Tipo de requerimiento no encontrado.`,
        HttpStatus.CONFLICT,
      );
    }

    return new HttpException(
      `¡Datos guardados correctamente!`,
      HttpStatus.ACCEPTED,
    );
  }

  async banRequirementeType(id: number) {
    const requirementTypeFound = await this.requirementTypeRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!requirementTypeFound) {
      return new HttpException(
        `El tipo de requerimiento con número de ID: ${id} no esta registrado.`,
        HttpStatus.CONFLICT,
      );
    }

    requirementTypeFound.is_active = !requirementTypeFound.is_active;

    await this.requirementTypeRepository.save(requirementTypeFound);

    const statusMessage = requirementTypeFound.is_active
      ? `El tipo de requerimiento con número de ID: ${requirementTypeFound.id} se ha ACTIVADO.`
      : `El tipo de requerimiento con número de ID: ${requirementTypeFound.id} se ha INACTIVADO.`;

    throw new HttpException(statusMessage, HttpStatus.ACCEPTED);
  }
}
