import { HttpException, HttpStatus, Injectable, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCompanyAreaDto } from '../dto/create-company_area.dto';
import { UpdateCompanyAreaDto } from '../dto/update-company_area.dto';
import { CompanyArea } from '../entities/company_area.entity';
import { CompanyAreaEnum } from 'shared/utils/enums/company_area.enum';
import { AuditLogsService } from 'src/audit_logs/services/audit_logs.service';
import { ActionTypesEnum } from 'src/audit_logs/utils/enums/action_types.enum';
import { QueryTypesEnum } from 'src/audit_logs/utils/enums/query_types.enum';
import { ModuleNameEnum } from 'src/audit_logs/utils/enums/module_names.enum';

@Injectable()
export class CompanyAreaService {
  constructor(
    @InjectRepository(CompanyArea)
    private companyAreaRepository: Repository<CompanyArea>,

    private readonly auditLogService: AuditLogsService,
  ) {}

  // CREATE FUNTIONS //

  async createCompanyArea(
    companyArea: CreateCompanyAreaDto,
    @Req() requestAuditLog: any,
  ) {
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

    const createCompanyArea =
      await this.companyAreaRepository.create(companyArea);

    const saveCompanyArea =
      await this.companyAreaRepository.save(createCompanyArea);

    const newCompanyArea = await this.companyAreaRepository.findOne({
      where: { id: saveCompanyArea.id },
    });

    const auditLogData = {
      ...requestAuditLog.auditLogData,
      action_type: ActionTypesEnum.CREATE_COMPANY_AREA,
      query_type: QueryTypesEnum.POST,
      module_name: ModuleNameEnum.COMPANY_AREA_MODULE,
      module_record_id: newCompanyArea.id,
    };

    await this.auditLogService.createAuditLog(auditLogData);

    return newCompanyArea;
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

  async getCompanyAreaByName(name?: CompanyAreaEnum) {
    if (name) {
      const companyAreaName = await this.companyAreaRepository.findOne({
        where: { name: name },
      });

      if (!companyAreaName) {
        throw new HttpException(
          `El área "${name}" de la compañia no existe`,
          HttpStatus.NOT_FOUND,
        );
      }

      return companyAreaName;
    }
  }

  // UPDATE FUNTIONS //

  async updateCompanyArea(
    id: number,
    companyArea: UpdateCompanyAreaDto,
    @Req() requestAuditLog: any,
  ) {
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

    const auditLogData = {
      ...requestAuditLog.auditLogData,
      action_type: ActionTypesEnum.UPDATE_COMPANY_AREA,
      query_type: QueryTypesEnum.PATCH,
      module_name: ModuleNameEnum.COMPANY_AREA_MODULE,
      module_record_id: id,
    };

    await this.auditLogService.createAuditLog(auditLogData);

    return new HttpException(
      `¡Datos guardados correctamente!`,
      HttpStatus.ACCEPTED,
    );
  }
}
