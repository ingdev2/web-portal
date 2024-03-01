import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEpsCompanyDto } from '../dto/create-eps_company.dto';
import { UpdateEpsCompanyDto } from '../dto/update-eps_company.dto';
import { EpsCompany } from '../entities/eps_company.entity';

@Injectable()
export class EpsCompanyService {
  constructor(
    @InjectRepository(EpsCompany)
    private epsCompanyRepository: Repository<EpsCompany>,
  ) {}

  // CREATE FUNTIONS //

  async createEpsCompany(epsCompany: CreateEpsCompanyDto) {
    const epsCompanyFound = await this.epsCompanyRepository.findOne({
      where: {
        nit: epsCompany.nit,
      },
    });

    if (epsCompanyFound) {
      return new HttpException(
        `La nit de empresa: ${epsCompany.nit} ya está registrado.`,
        HttpStatus.CONFLICT,
      );
    }

    const newEpsCompany = await this.epsCompanyRepository.create(epsCompany);

    return await this.epsCompanyRepository.save(newEpsCompany);
  }

  // GET FUNTIONS //

  async getAllEpsCompanies() {
    const allEpsCompanies = await this.epsCompanyRepository.find({
      order: {
        id: 'ASC',
      },
    });

    if (allEpsCompanies.length === 0) {
      return new HttpException(
        `No hay empresas registradas en la base de datos`,
        HttpStatus.CONFLICT,
      );
    } else {
      return allEpsCompanies;
    }
  }

  // UPDATE FUNTIONS //

  async updateEpsCompany(id: number, epsCompany: UpdateEpsCompanyDto) {
    const epsCompanyFound = await this.epsCompanyRepository.findOneBy({ id });

    if (!epsCompanyFound) {
      return new HttpException(
        `Empresa no encontrada.`,
        HttpStatus.UNAUTHORIZED,
      );
    }

    if (epsCompany.name) {
      const duplicateEpsCompany = await this.epsCompanyRepository.findOne({
        where: {
          name: epsCompany.name,
        },
      });

      if (duplicateEpsCompany) {
        return new HttpException(`Empresa duplicada.`, HttpStatus.CONFLICT);
      }
    }

    const updateEpsCompany = await this.epsCompanyRepository.update(
      id,
      epsCompany,
    );

    if (updateEpsCompany.affected === 0) {
      return new HttpException(`Empresa no encontrada.`, HttpStatus.CONFLICT);
    }

    return new HttpException(
      `¡Datos guardados correctamente!`,
      HttpStatus.ACCEPTED,
    );
  }
}
