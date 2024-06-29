import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCompanyAreaDto } from '../dto/create-company_area.dto';
import { UpdateCompanyAreaDto } from '../dto/update-company_area.dto';
import { CompanyArea } from '../entities/company_area.entity';

@Injectable()
export class CompanyAreaService {
  constructor(
    @InjectRepository(CompanyArea)
    private companyAreaRepository: Repository<CompanyArea>,
  ) {}

  // CREATE FUNTIONS //

  async createCompanyArea(companyArea: CreateCompanyAreaDto) {
    const companyAreaFound = await this.companyAreaRepository.findOne({
      where: {
        name: companyArea.name,
      },
    });

    if (companyAreaFound) {
      return new HttpException(
        `El área de empresa: ${companyArea.name} ya está registrada.`,
        HttpStatus.CONFLICT,
      );
    }

    const newCompanyArea = await this.companyAreaRepository.create(companyArea);

    return await this.companyAreaRepository.save(newCompanyArea);
  }

  // GET FUNTIONS //

  async getAllCompanyAreas() {
    const allCompanyAreas = await this.companyAreaRepository.find({
      order: {
        id: 'ASC',
      },
    });

    if (allCompanyAreas.length === 0) {
      return new HttpException(
        `No hay áreas de empresa registradas en la base de datos`,
        HttpStatus.CONFLICT,
      );
    } else {
      return allCompanyAreas;
    }
  }

  async getCompanyAreaById(id: number) {
    const companyAreaFound = await this.companyAreaRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!companyAreaFound) {
      return new HttpException(
        `El área de empresa con número de ID: ${id} no esta registrado.`,
        HttpStatus.CONFLICT,
      );
    } else {
      return companyAreaFound;
    }
  }

  // UPDATE FUNTIONS //

  async updateCompanyArea(id: number, companyArea: UpdateCompanyAreaDto) {
    const companyAreaFound = await this.companyAreaRepository.findOneBy({ id });

    if (!companyAreaFound) {
      return new HttpException(
        `Área de empresa no encontrada.`,
        HttpStatus.UNAUTHORIZED,
      );
    }

    if (companyArea.name) {
      const duplicateCompanyArea = await this.companyAreaRepository.findOne({
        where: {
          name: companyArea.name,
        },
      });

      if (duplicateCompanyArea) {
        return new HttpException(
          `Área de empresa duplicada.`,
          HttpStatus.CONFLICT,
        );
      }
    }

    const updateCompanyArea = await this.companyAreaRepository.update(
      id,
      companyArea,
    );

    if (updateCompanyArea.affected === 0) {
      return new HttpException(
        `Área de empresa no encontrada.`,
        HttpStatus.CONFLICT,
      );
    }

    return new HttpException(
      `¡Datos guardados correctamente!`,
      HttpStatus.ACCEPTED,
    );
  }
}
