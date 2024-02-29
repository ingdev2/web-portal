import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRelWithPatientDto } from '../dto/create-rel_with_patient.dto';
import { UpdateRelWithPatientDto } from '../dto/update-rel_with_patient.dto';
import { RelWithPatient } from '../entities/rel_with_patient.entity';

@Injectable()
export class RelWithPatientService {
  constructor(
    @InjectRepository(RelWithPatient)
    private relWithPatientRepository: Repository<RelWithPatient>,
  ) {}

  // CREATE FUNTIONS //

  async createRelWithPatient(relWithPatient: CreateRelWithPatientDto) {
    const relWithPatientFound = await this.relWithPatientRepository.findOne({
      where: {
        name: relWithPatient.name,
      },
    });

    if (relWithPatientFound) {
      return new HttpException(
        `El parentesco con paciente: ${relWithPatient.name} ya está registrado.`,
        HttpStatus.CONFLICT,
      );
    }

    const newRelWithPatient =
      await this.relWithPatientRepository.create(relWithPatient);

    return await this.relWithPatientRepository.save(newRelWithPatient);
  }

  // GET FUNTIONS //

  async getAllRelWithPatient() {
    const allRelWithPatient = await this.relWithPatientRepository.find({
      order: {
        id: 'ASC',
      },
    });

    if (allRelWithPatient.length === 0) {
      return new HttpException(
        `No hay parentesco con paciente registrados en la base de datos`,
        HttpStatus.CONFLICT,
      );
    } else {
      return allRelWithPatient;
    }
  }

  async getRelWithPatientById(id: number) {
    const relWithPatient = await this.relWithPatientRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!relWithPatient) {
      return new HttpException(
        `No hay parentesco con paciente con el id dado`,
        HttpStatus.CONFLICT,
      );
    } else {
      return relWithPatient;
    }
  }

  // UPDATE FUNTIONS //

  async updateRelWithPatient(
    id: number,
    relWithPatient: UpdateRelWithPatientDto,
  ) {
    const relWithPatientFound = await this.relWithPatientRepository.findOneBy({
      id,
    });

    if (!relWithPatientFound) {
      return new HttpException(
        `Parentesco con paciente no encontrado.`,
        HttpStatus.UNAUTHORIZED,
      );
    }

    if (relWithPatient.name) {
      const duplicateRelWithPatient =
        await this.relWithPatientRepository.findOne({
          where: {
            name: relWithPatient.name,
          },
        });

      if (duplicateRelWithPatient) {
        return new HttpException(
          `Nombre de parentesco con paciente duplicado.`,
          HttpStatus.CONFLICT,
        );
      }
    }

    const updateRelWithPatient = await this.relWithPatientRepository.update(
      id,
      relWithPatient,
    );

    if (updateRelWithPatient.affected === 0) {
      return new HttpException(
        `Parentesco con paciente no encontrado.`,
        HttpStatus.CONFLICT,
      );
    }

    return new HttpException(
      `¡Datos guardados correctamente!`,
      HttpStatus.ACCEPTED,
    );
  }
}
