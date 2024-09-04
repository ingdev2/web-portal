import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { CreateEpsCompanyDto } from '../dto/create-eps_company.dto';
import { UpdateEpsCompanyDto } from '../dto/update-eps_company.dto';
import { EpsCompany } from '../entities/eps_company.entity';
import { validateCorporateEmail } from '../helpers/validate_corporate_email';
import { SendEmailDto } from 'src/nodemailer/dto/send_email.dto';
import { NodemailerService } from 'src/nodemailer/services/nodemailer.service';

import {
  EPS_COMPANY_CREATED_NOTIFICATION_TO_EPS,
  SUBJECT_EPS_COMPANY_CREATED_NOTIFICATION_TO_EPS,
} from 'src/nodemailer/constants/email_config.constant';
import { CONTACT_PBX } from 'src/utils/constants/constants';

@Injectable()
export class EpsCompanyService {
  constructor(
    @InjectRepository(EpsCompany)
    private epsCompanyRepository: Repository<EpsCompany>,

    private readonly nodemailerService: NodemailerService,
  ) {}

  // CREATE FUNTIONS //

  async createEpsCompany(epsCompany: CreateEpsCompanyDto) {
    const epsCompanyNameFound = await this.epsCompanyRepository.findOne({
      where: {
        name: epsCompany.name,
      },
    });

    if (epsCompanyNameFound) {
      return new HttpException(
        `La empresa: ${epsCompany.name} ya está registrado.`,
        HttpStatus.CONFLICT,
      );
    }

    const epsCompanyNitFound = await this.epsCompanyRepository.findOne({
      where: {
        nit: epsCompany.nit,
      },
    });

    if (epsCompanyNitFound) {
      return new HttpException(
        `El nit de empresa: ${epsCompany.nit} ya está registrado.`,
        HttpStatus.CONFLICT,
      );
    }

    const epsCompanyEmailFound = await this.epsCompanyRepository.findOne({
      where: {
        main_email: epsCompany.main_email,
      },
    });

    if (epsCompanyEmailFound) {
      return new HttpException(
        `El email de empresa: ${epsCompany.main_email} ya está registrado.`,
        HttpStatus.CONFLICT,
      );
    }

    const isCorporateEmail = await validateCorporateEmail(
      epsCompany.main_email,
    );
    if (!isCorporateEmail) {
      throw new HttpException(
        `El email de empresa: ${epsCompany.main_email} no es un correo corporativo válido.`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const newEpsCompany = await this.epsCompanyRepository.create(epsCompany);

    const emailEpsCompanyCreatedToSend = new SendEmailDto();

    emailEpsCompanyCreatedToSend.recipients = [epsCompany.main_email];
    emailEpsCompanyCreatedToSend.userNameToEmail = epsCompany.name;
    emailEpsCompanyCreatedToSend.subject =
      SUBJECT_EPS_COMPANY_CREATED_NOTIFICATION_TO_EPS;
    emailEpsCompanyCreatedToSend.emailTemplate =
      EPS_COMPANY_CREATED_NOTIFICATION_TO_EPS;
    emailEpsCompanyCreatedToSend.portalWebUrl = process.env.PORTAL_WEB_URL;
    emailEpsCompanyCreatedToSend.contactPbx = CONTACT_PBX;
    emailEpsCompanyCreatedToSend.emailOfEps = epsCompany.main_email;

    await this.nodemailerService.sendEmail(emailEpsCompanyCreatedToSend);

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

  async getCompanyById(id: number) {
    const companyFound = await this.epsCompanyRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!companyFound) {
      return new HttpException(
        `La empresa con número de ID: ${id} no esta registrado.`,
        HttpStatus.CONFLICT,
      );
    } else {
      return companyFound;
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

    const emailEpsCompanyValidate = await this.epsCompanyRepository.findOne({
      where: {
        id: Not(epsCompanyFound.id),
        main_email: epsCompany.main_email,
      },
    });

    if (emailEpsCompanyValidate) {
      return new HttpException(
        `El correo electrónico ${epsCompany.main_email} ya está registrado.`,
        HttpStatus.CONFLICT,
      );
    }

    const isCorporateEmail = await validateCorporateEmail(
      epsCompany.main_email,
    );

    if (!isCorporateEmail) {
      throw new HttpException(
        `El email de empresa: ${epsCompany.main_email} no es un correo corporativo válido.`,
        HttpStatus.BAD_REQUEST,
      );
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

  // DELETED-BAN FUNTIONS //

  async banEpsCompanies(id: number) {
    const epsCompanyFound = await this.epsCompanyRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!epsCompanyFound) {
      return new HttpException(
        `La EPS con número de ID: ${id} no esta registrado.`,
        HttpStatus.CONFLICT,
      );
    }

    epsCompanyFound.is_active = !epsCompanyFound.is_active;

    await this.epsCompanyRepository.save(epsCompanyFound);

    const statusMessage = epsCompanyFound.is_active
      ? `La EPS con número de ID: ${epsCompanyFound.id} se ha ACTIVADO.`
      : `La EPS con número de ID: ${epsCompanyFound.id} se ha INACTIVADO.`;

    throw new HttpException(statusMessage, HttpStatus.ACCEPTED);
  }
}
