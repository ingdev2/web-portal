import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MedicalReq } from '../entities/medical_req.entity';
import { CreateMedicalReqPersonDto } from '../dto/create_medical_req_person.dto';
import { User, UserRolType } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/services/users.service';
import { CreateMedicalReqEpsDto } from '../dto/create_medical_req_eps.dto';
import { UpdateStatusMedicalReqDto } from '../dto/update_status_medical_req.dto';

@Injectable()
export class MedicalReqService {
  constructor(
    @InjectRepository(MedicalReq)
    private medicalReqRepository: Repository<MedicalReq>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
    private usersService: UsersService,
  ) {}

  // CREATE FUNTIONS //

  async createMedicalReqPerson(
    userId: string,
    medicalReqPerson: CreateMedicalReqPersonDto,
  ) {
    const userPersonFound = await this.userRepository.findOne({
      where: {
        id: userId,
        role: UserRolType.PERSON,
      },
    });

    if (!userPersonFound) {
      return new HttpException(
        `El usuario no está registrado.`,
        HttpStatus.CONFLICT,
      );
    }

    const aplicantPersonDetails = new CreateMedicalReqPersonDto();

    aplicantPersonDetails.aplicantId = userPersonFound.id;
    aplicantPersonDetails.medicalReqUserType = userPersonFound.role;
    aplicantPersonDetails.aplicant_name = userPersonFound.name;
    aplicantPersonDetails.aplicant_last_name = userPersonFound.last_name;
    aplicantPersonDetails.aplicant_gender = userPersonFound.gender;
    aplicantPersonDetails.aplicant_id_type = userPersonFound.id_type;
    aplicantPersonDetails.aplicant_id_number = userPersonFound.id_number;
    aplicantPersonDetails.aplicant_email = userPersonFound.email;
    aplicantPersonDetails.aplicant_cellphone = userPersonFound.cellphone;

    const currentDate = new Date();
    aplicantPersonDetails.date_of_admission = currentDate;

    if (
      medicalReqPerson.right_petition &&
      !medicalReqPerson.copy_right_petition
    ) {
      return new HttpException(
        `No se ha adjuntado el documento de derecho de petición.`,
        HttpStatus.CONFLICT,
      );
    }

    if (
      !medicalReqPerson.copy_applicant_citizenship_card &&
      !medicalReqPerson.copy_cohabitation_certificate &&
      !medicalReqPerson.copy_marriage_certicate &&
      !medicalReqPerson.copy_parents_citizenship_card &&
      !medicalReqPerson.copy_patient_citizenship_card &&
      !medicalReqPerson.copy_patient_civil_registration
    ) {
      return new HttpException(
        `No se ha adjuntado ningún documento.`,
        HttpStatus.CONFLICT,
      );
    }

    const createMedicalReqPerson =
      await this.medicalReqRepository.save(medicalReqPerson);

    await this.medicalReqRepository.update(
      createMedicalReqPerson.id,
      aplicantPersonDetails,
    );

    const medicalReqCompleted = await this.medicalReqRepository.findOne({
      where: {
        aplicantId: userId,
        id: createMedicalReqPerson.id,
      },
    });

    return await medicalReqCompleted;
  }

  async createMedicalReqEps(
    userId: string,
    medicalReqEps: CreateMedicalReqEpsDto,
  ) {
    const userEpsFound = await this.userRepository.findOne({
      where: {
        id: userId,
        role: UserRolType.EPS,
      },
    });

    if (!userEpsFound) {
      return new HttpException(
        `El usuario no está registrado.`,
        HttpStatus.CONFLICT,
      );
    }

    const aplicantEpsDetails = new CreateMedicalReqEpsDto();

    aplicantEpsDetails.aplicantId = userEpsFound.id;
    aplicantEpsDetails.medicalReqUserType = userEpsFound.role;
    aplicantEpsDetails.aplicant_name = userEpsFound.name;
    aplicantEpsDetails.aplicant_last_name = userEpsFound.last_name;
    aplicantEpsDetails.aplicant_gender = userEpsFound.gender;
    aplicantEpsDetails.aplicant_id_type = userEpsFound.id_type;
    aplicantEpsDetails.aplicant_id_number = userEpsFound.id_number;
    aplicantEpsDetails.aplicant_email = userEpsFound.email;
    aplicantEpsDetails.aplicant_company_name = userEpsFound.company_name;
    aplicantEpsDetails.aplicant_company_area = userEpsFound.company_area;

    const currentDate = new Date();
    aplicantEpsDetails.date_of_admission = currentDate;

    const createMedicalReq =
      await this.medicalReqRepository.save(medicalReqEps);

    await this.medicalReqRepository.update(
      createMedicalReq.id,
      aplicantEpsDetails,
    );

    const medicalReqCompleted = await this.medicalReqRepository.findOne({
      where: {
        aplicantId: userId,
        id: createMedicalReq.id,
      },
    });

    return await medicalReqCompleted;
  }

  // GET FUNTIONS //

  async getAllMedicalReqPerson() {
    const allMedicalReqPerson = await this.medicalReqRepository.find({
      where: {
        medicalReqUserType: UserRolType.PERSON,
        is_deleted: false,
      },
      order: {
        createdAt: 'ASC',
      },
    });

    if (allMedicalReqPerson.length == 0) {
      return new HttpException(
        `No hay requerimientos creados actualmente.`,
        HttpStatus.CONFLICT,
      );
    } else {
      return allMedicalReqPerson;
    }
  }

  async getAllMedicalReqEps() {
    const allMedicalReqEps = await this.medicalReqRepository.find({
      where: {
        medicalReqUserType: UserRolType.EPS,
        is_deleted: false,
      },
      order: {
        createdAt: 'ASC',
      },
    });

    if (allMedicalReqEps.length == 0) {
      return new HttpException(
        `No hay requerimientos creados actualmente.`,
        HttpStatus.CONFLICT,
      );
    } else {
      return allMedicalReqEps;
    }
  }

  async getMedicalReqPersonById(id: string) {
    const medicalReqPersonFound = await this.medicalReqRepository.findOne({
      where: {
        id: id,
        medicalReqUserType: UserRolType.PERSON,
        is_deleted: false,
      },
    });

    if (!medicalReqPersonFound) {
      return new HttpException(
        `El requerimiento médico con número de ID: ${id} no está registrado.`,
        HttpStatus.CONFLICT,
      );
    } else {
      return medicalReqPersonFound;
    }
  }

  async getMedicalReqEpsById(id: string) {
    const medicalReqEpsFound = await this.medicalReqRepository.findOne({
      where: {
        id: id,
        medicalReqUserType: UserRolType.EPS,
        is_deleted: false,
      },
    });

    if (!medicalReqEpsFound) {
      return new HttpException(
        `El requerimiento médico con número de ID: ${id} no está registrado.`,
        HttpStatus.CONFLICT,
      );
    } else {
      return medicalReqEpsFound;
    }
  }

  async getMedicalReqByFilingNumber(filingNumber: string) {
    const medicalReqFound = await this.medicalReqRepository.findOne({
      where: {
        filing_number: filingNumber,
        is_deleted: false,
      },
    });

    if (!medicalReqFound) {
      return new HttpException(
        `El requerimiento médico con número de radicado: ${filingNumber} no está registrado.`,
        HttpStatus.CONFLICT,
      );
    } else {
      return medicalReqFound;
    }
  }

  // UPDATE FUNTIONS //

  async updateStatus(
    id: string,
    newStatusMedicalReq: UpdateStatusMedicalReqDto,
  ) {
    const updateMedicalReq = await this.medicalReqRepository.update(
      id,
      newStatusMedicalReq,
    );

    if (updateMedicalReq.affected === 0) {
      return new HttpException(
        `Requerimiento médico no encontrado`,
        HttpStatus.CONFLICT,
      );
    }

    return new HttpException(
      `¡Estado cambiado correctamente!`,
      HttpStatus.ACCEPTED,
    );
  }

  // DELETED-BAN FUNTIONS //

  async deletedMedicalReq(id: string) {
    const medicalReqFound = await this.medicalReqRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!medicalReqFound) {
      return new HttpException(
        `El requerimiento médico con número de ID: ${id} no esta registrado.`,
        HttpStatus.CONFLICT,
      );
    }

    medicalReqFound.is_deleted = !medicalReqFound.is_deleted;

    await this.medicalReqRepository.save(medicalReqFound);

    return new HttpException(
      `El requerimiento médico con número de radicado: ${medicalReqFound.filing_number} está con estado borrado: ${medicalReqFound.is_deleted}`,
      HttpStatus.CONFLICT,
    );
  }
}
