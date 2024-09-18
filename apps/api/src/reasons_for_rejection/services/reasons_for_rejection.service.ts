import { HttpException, HttpStatus, Injectable, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { CreateReasonsForRejectionDto } from '../dto/create-reasons_for_rejection.dto';
import { UpdateReasonsForRejectionDto } from '../dto/update-reasons_for_rejection.dto';
import { ReasonsForRejection } from '../entities/reasons_for_rejection.entity';
import { AuditLogsService } from 'src/audit_logs/services/audit_logs.service';
import { ActionTypesEnum } from 'shared/utils/enums/audit_logs_enums/action_types.enum';
import { QueryTypesEnum } from 'shared/utils/enums/audit_logs_enums/query_types.enum';
import { ModuleNameEnum } from 'shared/utils/enums/audit_logs_enums/module_names.enum';

@Injectable()
export class ReasonsForRejectionService {
  constructor(
    @InjectRepository(ReasonsForRejection)
    private reasonsForRejectionRepository: Repository<ReasonsForRejection>,

    private readonly auditLogService: AuditLogsService,
  ) {}

  // CREATE FUNTIONS //

  async createReasonForRejection(
    reasonForRejection: CreateReasonsForRejectionDto,
    @Req() requestAuditLog: any,
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

    const createNewReason =
      await this.reasonsForRejectionRepository.create(reasonForRejection);

    const saveNewReason =
      await this.reasonsForRejectionRepository.save(createNewReason);

    const newEpsCompany = await this.reasonsForRejectionRepository.findOne({
      where: { id: saveNewReason.id },
    });

    const auditLogData = {
      ...requestAuditLog.auditLogData,
      action_type: ActionTypesEnum.CREATE_REASON_FOR_REJECTION,
      query_type: QueryTypesEnum.POST,
      module_name: ModuleNameEnum.REASONS_FOR_REJECTION_MODULE,
      module_record_id: newEpsCompany.id,
    };

    await this.auditLogService.createAuditLog(auditLogData);

    return newEpsCompany;
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

  async getReasonForRejectionById(id: number) {
    const reasonForRejectionFound =
      await this.reasonsForRejectionRepository.findOne({
        where: {
          id: id,
        },
      });

    if (!reasonForRejectionFound) {
      return new HttpException(
        `El motivo de rechazo con número de ID: ${id} no esta registrado.`,
        HttpStatus.CONFLICT,
      );
    } else {
      return reasonForRejectionFound;
    }
  }

  // UPDATE FUNTIONS //

  async updateReasonForRejection(
    id: number,
    reasonForRejection: UpdateReasonsForRejectionDto,
    @Req() requestAuditLog: any,
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
            id: Not(reasonFound.id),
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

    const auditLogData = {
      ...requestAuditLog.auditLogData,
      action_type: ActionTypesEnum.UPDATE_DATA_REASON_FOR_REJECTION,
      query_type: QueryTypesEnum.PATCH,
      module_name: ModuleNameEnum.REASONS_FOR_REJECTION_MODULE,
      module_record_id: id,
    };

    await this.auditLogService.createAuditLog(auditLogData);

    return new HttpException(
      `¡Datos guardados correctamente!`,
      HttpStatus.ACCEPTED,
    );
  }
}
