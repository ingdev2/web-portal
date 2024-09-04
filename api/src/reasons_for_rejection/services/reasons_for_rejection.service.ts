import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReasonsForRejectionDto } from '../dto/create-reasons_for_rejection.dto';
import { UpdateReasonsForRejectionDto } from '../dto/update-reasons_for_rejection.dto';
import { ReasonsForRejection } from '../entities/reasons_for_rejection.entity';

@Injectable()
export class ReasonsForRejectionService {
  constructor(
    @InjectRepository(ReasonsForRejection)
    private reasonsForRejectionRepository: Repository<ReasonsForRejection>,
  ) {}

  // CREATE FUNTIONS //

  async createReasonForRejection(
    reasonForRejection: CreateReasonsForRejectionDto,
  ) {
    const reasonFound = await this.reasonsForRejectionRepository.findOne({
      where: {
        rejection_title: reasonForRejection.rejection_title,
      },
    });

    if (reasonFound) {
      return new HttpException(
        `El motivo de rechazo: ${reasonForRejection.rejection_title} ya está registrado.`,
        HttpStatus.CONFLICT,
      );
    }

    const newReason =
      await this.reasonsForRejectionRepository.create(reasonForRejection);

    return await this.reasonsForRejectionRepository.save(newReason);
  }

  // GET FUNTIONS //

  async getAllReasonsForRejection() {
    const allReasonsForRejection =
      await this.reasonsForRejectionRepository.find({
        order: {
          id: 'ASC',
        },
      });

    if (allReasonsForRejection.length === 0) {
      return new HttpException(
        `No hay motivos de rechazo en la base de datos`,
        HttpStatus.CONFLICT,
      );
    } else {
      return allReasonsForRejection;
    }
  }

  // UPDATE FUNTIONS //

  async updateReasonForRejection(
    id: number,
    reasonForRejection: UpdateReasonsForRejectionDto,
  ) {
    const reasonFound = await this.reasonsForRejectionRepository.findOneBy({
      id,
    });

    if (!reasonFound) {
      return new HttpException(
        `Motivo de rechazo no encontrado.`,
        HttpStatus.UNAUTHORIZED,
      );
    }

    if (reasonForRejection.rejection_title) {
      const duplicateEpsCompany =
        await this.reasonsForRejectionRepository.findOne({
          where: {
            rejection_title: reasonForRejection.rejection_title,
          },
        });

      if (duplicateEpsCompany) {
        return new HttpException(
          `Motivo de rechazo duplicado.`,
          HttpStatus.CONFLICT,
        );
      }
    }

    const updateReasonForRejection =
      await this.reasonsForRejectionRepository.update(id, reasonForRejection);

    if (updateReasonForRejection.affected === 0) {
      return new HttpException(
        `Motivo de rechazo no encontrado.`,
        HttpStatus.CONFLICT,
      );
    }

    return new HttpException(
      `¡Datos guardados correctamente!`,
      HttpStatus.ACCEPTED,
    );
  }
}
