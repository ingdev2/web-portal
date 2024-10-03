import { HttpException, HttpStatus, Injectable, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { CreateRequirementTypeDto } from '../dto/create-requirement_type.dto';
import { UpdateRequirementTypeDto } from '../dto/update-requirement_type.dto';
import { RequirementType } from '../entities/requirement_type.entity';
import { AuditLogsService } from 'src/audit_logs/services/audit_logs.service';
import { ActionTypesEnum } from '../../utils/enums/audit_logs_enums/action_types.enum';
import { QueryTypesEnum } from '../../utils/enums/audit_logs_enums/query_types.enum';
import { ModuleNameEnum } from '../../utils/enums/audit_logs_enums/module_names.enum';

@Injectable()
export class RequirementTypeService {
  constructor(
    @InjectRepository(RequirementType)
    private requirementTypeRepository: Repository<RequirementType>,

    private readonly auditLogService: AuditLogsService,
  ) {}

  // CREATE FUNTIONS //

  async createRequirementType(
    requirementType: CreateRequirementTypeDto,
    @Req() requestAuditLog: any,
  ) {
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

    const createRequirementType =
      await this.requirementTypeRepository.create(requirementType);

    const saveRequirementType = await this.requirementTypeRepository.save(
      createRequirementType,
    );

    const newReqType = await this.requirementTypeRepository.findOne({
      where: { id: saveRequirementType.id },
    });

    const auditLogData = {
      ...requestAuditLog.auditLogData,
      action_type: ActionTypesEnum.CREATE_REQ_TYPE,
      query_type: QueryTypesEnum.POST,
      module_name: ModuleNameEnum.REQ_TYPE_MODULE,
      module_record_id: newReqType.id,
    };

    await this.auditLogService.createAuditLog(auditLogData);

    return newReqType;
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
    @Req() requestAuditLog: any,
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
            id: Not(requirementTypeFound.id),
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

    const auditLogData = {
      ...requestAuditLog.auditLogData,
      action_type: ActionTypesEnum.UPDATE_REQ_TYPE,
      query_type: QueryTypesEnum.PATCH,
      module_name: ModuleNameEnum.REQ_TYPE_MODULE,
      module_record_id: id,
    };

    await this.auditLogService.createAuditLog(auditLogData);

    return new HttpException(
      `¡Datos guardados correctamente!`,
      HttpStatus.ACCEPTED,
    );
  }

  async banRequirementeType(id: number, @Req() requestAuditLog: any) {
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

    const auditLogData = {
      ...requestAuditLog.auditLogData,
      action_type:
        requirementTypeFound.is_active === false
          ? ActionTypesEnum.BAN_REQ_TYPE
          : ActionTypesEnum.UNBAN_REQ_TYPE,
      query_type: QueryTypesEnum.PATCH,
      module_name: ModuleNameEnum.REQ_TYPE_MODULE,
      module_record_id: requirementTypeFound.id,
    };

    await this.auditLogService.createAuditLog(auditLogData);

    const statusMessage = requirementTypeFound.is_active
      ? `El tipo de requerimiento con número de ID: ${requirementTypeFound.id} se ha ACTIVADO.`
      : `El tipo de requerimiento con número de ID: ${requirementTypeFound.id} se ha INACTIVADO.`;

    throw new HttpException(statusMessage, HttpStatus.ACCEPTED);
  }
}
