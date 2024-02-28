import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePatientClassStatusDto } from '../dto/create-patient_class_status.dto';
import { UpdatePatientClassStatusDto } from '../dto/update-patient_class_status.dto';
import { PatientClassStatus } from '../entities/patient_class_status.entity';

@Injectable()
export class PatientClassStatusService {
  constructor(
    @InjectRepository(PatientClassStatus)
    private patientClassStatusRepository: Repository<PatientClassStatus>,
  ) {}

  // CREATE FUNTIONS //

  async createPatientClassStatus(
    patientClassStatus: CreatePatientClassStatusDto,
  ) {
    const patientClassStatusFound =
      await this.patientClassStatusRepository.findOne({
        where: {
          name: patientClassStatus.name,
        },
      });

    if (patientClassStatusFound) {
      return new HttpException(
        `La clasificación de paciente: ${patientClassStatus.name} ya está registrado.`,
        HttpStatus.CONFLICT,
      );
    }

    const newPatientClassStatus =
      await this.patientClassStatusRepository.create(patientClassStatus);

    return await this.patientClassStatusRepository.save(newPatientClassStatus);
  }

  // GET FUNTIONS //

  async getAllPatientClassStatus() {
    const allPatientClassStatus = await this.patientClassStatusRepository.find({
      order: {
        id: 'ASC',
      },
    });

    if (allPatientClassStatus.length === 0) {
      return new HttpException(
        `No hay estado clasificación de paciente registrados en la base de datos`,
        HttpStatus.CONFLICT,
      );
    } else {
      return allPatientClassStatus;
    }
  }

  async getPatientClassStatusById(id: number) {
    const patientClassStatus = await this.patientClassStatusRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!patientClassStatus) {
      return new HttpException(
        `No hay clasificación de paciente con el id dado`,
        HttpStatus.CONFLICT,
      );
    } else {
      return patientClassStatus;
    }
  }

  // UPDATE FUNTIONS //

  async updatePatientClassStatus(
    id: number,
    patientClassStatus: UpdatePatientClassStatusDto,
  ) {
    const patientClassStatusFound =
      await this.patientClassStatusRepository.findOneBy({
        id,
      });

    if (!patientClassStatusFound) {
      return new HttpException(
        `Clasificación de paciente no encontrado.`,
        HttpStatus.UNAUTHORIZED,
      );
    }

    if (patientClassStatus.name) {
      const duplicatePatientClassStatus =
        await this.patientClassStatusRepository.findOne({
          where: {
            name: patientClassStatus.name,
          },
        });

      if (duplicatePatientClassStatus) {
        return new HttpException(
          `Nombre de clasificación de paciente duplicado.`,
          HttpStatus.CONFLICT,
        );
      }
    }

    const updatePatientClassStatus =
      await this.patientClassStatusRepository.update(id, patientClassStatus);

    if (updatePatientClassStatus.affected === 0) {
      return new HttpException(
        `Clasificación de paciente no encontrado.`,
        HttpStatus.CONFLICT,
      );
    }

    return new HttpException(
      `¡Datos guardados correctamente!`,
      HttpStatus.ACCEPTED,
    );
  }
}
