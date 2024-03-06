import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MedicalReq } from '../entities/medical_req.entity';
import { CreateMedicalReqPersonDto } from '../dto/create_medical_req_person.dto';
import { CreateMedicalReqEpsDto } from '../dto/create_medical_req_eps.dto';
import { User } from '../../users/entities/user.entity';
import { UserRole } from '../../user_roles/entities/user_role.entity';
import { UpdateStatusMedicalReqDto } from '../dto/update_status_medical_req.dto';
import { NodemailerService } from '../../nodemailer/services/nodemailer.service';
import { RequirementTypeService } from '../../requirement_type/services/requirement_type.service';
import { SendEmailDto } from '../../nodemailer/dto/send_email.dto';
import {
  MEDICAL_REQ_CREATED,
  MEDICAL_REQ_UPDATE,
  SUBJECT_EMAIL_CONFIRM_CREATION,
  SUBJECT_EMAIL_STATUS_CHANGE,
} from '../../nodemailer/constants/email_config.constant';
import { UserRolType } from '../../common/enums/user_roles.enum';
import { IdTypeEntity } from '../../id_types/entities/id_type.entity';
import { RequirementType } from '../../requirement_type/entities/requirement_type.entity';
import { RequirementStatus } from '../../requirement_status/entities/requirement_status.entity';
import { PatientClassStatus } from '../../patient_class_status/entities/patient_class_status.entity';
import { PatientClassificationStatus } from '../enums/patient_classification_status.enum';
import { RelWithPatient } from '../../rel_with_patient/entities/rel_with_patient.entity';
import { RelationshipWithPatient } from '../enums/relationship_with_patient.enum';
import { RequirementStatusEnum } from '../enums/requirement_status.enum';

@Injectable()
export class MedicalReqService {
  constructor(
    @InjectRepository(MedicalReq)
    private medicalReqRepository: Repository<MedicalReq>,

    @InjectRepository(UserRole)
    private userRoleRepository: Repository<UserRole>,

    @InjectRepository(IdTypeEntity)
    private userIdTypeRepository: Repository<IdTypeEntity>,

    @InjectRepository(RequirementType)
    private medicalReqTypeRepository: Repository<IdTypeEntity>,

    @InjectRepository(RequirementStatus)
    private requerimentStatusRepository: Repository<RequirementStatus>,

    @InjectRepository(PatientClassStatus)
    private patientClassStatusRepository: Repository<PatientClassStatus>,

    @InjectRepository(RelWithPatient)
    private relWithPatientRepository: Repository<RelWithPatient>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
    private nodemailerService: NodemailerService,
    private readonly requirementTypeService: RequirementTypeService,
  ) {}

  // CREATE FUNTIONS //

  async createMedicalReqPerson(
    userId: string,
    medicalReqPerson: CreateMedicalReqPersonDto,
  ) {
    const userPersonFound = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });

    if (!userPersonFound) {
      return new HttpException(
        `El usuario no está registrado.`,
        HttpStatus.CONFLICT,
      );
    }

    const userRolePerson = await this.userRoleRepository.findOne({
      where: {
        id: userPersonFound.user_role,
        name: UserRolType.PATIENT,
      },
    });

    if (!userRolePerson) {
      throw new HttpException(
        'El usuario debe tener el rol "Paciente".',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const aplicantPersonDetails = new CreateMedicalReqPersonDto();

    aplicantPersonDetails.aplicantId = userPersonFound.id;
    aplicantPersonDetails.medicalReqUserType = userPersonFound.user_role;
    aplicantPersonDetails.aplicant_name = userPersonFound.name;
    aplicantPersonDetails.aplicant_last_name = userPersonFound.last_name;
    aplicantPersonDetails.aplicant_gender = userPersonFound.user_gender;
    aplicantPersonDetails.aplicant_id_type = userPersonFound.user_id_type;
    aplicantPersonDetails.aplicant_id_number = userPersonFound.id_number;
    aplicantPersonDetails.aplicant_email = userPersonFound.email;
    aplicantPersonDetails.aplicant_cellphone = userPersonFound.cellphone;

    const currentDate = new Date();
    aplicantPersonDetails.date_of_admission = currentDate;

    const {
      right_petition,
      copy_right_petition,
      copy_patient_citizenship_card,
      copy_patient_civil_registration,
      copy_applicant_citizenship_card,
      copy_parents_citizenship_card,
      copy_cohabitation_certificate,
      copy_marriage_certificate,
    } = medicalReqPerson;

    const minorDocuments =
      copy_parents_citizenship_card && copy_patient_civil_registration;

    const adultDocuments = copy_patient_citizenship_card;

    const documentsDeceasedParents = copy_patient_citizenship_card;

    const documentsDeceasedSon =
      copy_patient_citizenship_card &&
      copy_patient_civil_registration &&
      copy_applicant_citizenship_card;

    const documentsDeceasedSpouse =
      copy_patient_citizenship_card &&
      copy_applicant_citizenship_card &&
      copy_marriage_certificate;

    const documentsDeceasedFamiliar =
      copy_patient_citizenship_card &&
      copy_applicant_citizenship_card &&
      copy_cohabitation_certificate;

    if (right_petition && !copy_right_petition) {
      return new HttpException(
        `No se ha adjuntado el documento de derecho de petición.`,
        HttpStatus.CONFLICT,
      );
    }

    const patientClassStatus = await this.patientClassStatusRepository.findOne({
      where: { id: medicalReqPerson.patient_class_status },
    });

    if (!patientClassStatus) {
      throw new HttpException(
        'La clasificación de paciente no es valida',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const patientClassStatusName = patientClassStatus.name;

    if (
      patientClassStatusName === PatientClassificationStatus.YOUNGER &&
      !minorDocuments
    ) {
      throw new HttpException(
        `No se han adjuntado todos los documentos requeridos.`,
        HttpStatus.CONFLICT,
      );
    }

    if (
      patientClassStatusName === PatientClassificationStatus.ADULT &&
      !adultDocuments
    ) {
      return new HttpException(
        `No se han adjuntado todos los documentos requeridos.`,
        HttpStatus.CONFLICT,
      );
    }

    const relWithPatient = await this.relWithPatientRepository.findOne({
      where: { id: medicalReqPerson.relationship_with_patient },
    });

    if (!relWithPatient) {
      throw new HttpException(
        'El parentesco con el paciente no es valido',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const relWithPatientName = relWithPatient.name;

    if (patientClassStatusName === PatientClassificationStatus.DECEASED) {
      if (
        relWithPatientName === RelationshipWithPatient.PARENT &&
        !documentsDeceasedParents
      ) {
        return new HttpException(
          `No se han adjuntado todos los documentos requeridos.`,
          HttpStatus.CONFLICT,
        );
      }

      if (
        relWithPatientName === RelationshipWithPatient.SON &&
        !documentsDeceasedSon
      ) {
        return new HttpException(
          `No se han adjuntado todos los documentos requeridos.`,
          HttpStatus.CONFLICT,
        );
      }

      if (
        relWithPatientName === RelationshipWithPatient.SPOUSE &&
        !documentsDeceasedSpouse
      ) {
        return new HttpException(
          `No se han adjuntado todos los documentos requeridos.`,
          HttpStatus.CONFLICT,
        );
      }

      if (
        relWithPatientName === RelationshipWithPatient.BROTHER &&
        !documentsDeceasedFamiliar
      ) {
        return new HttpException(
          `No se han adjuntado todos los documentos requeridos.`,
          HttpStatus.CONFLICT,
        );
      }

      if (
        relWithPatientName === RelationshipWithPatient.FAMILIAR &&
        !documentsDeceasedFamiliar
      ) {
        return new HttpException(
          `No se han adjuntado todos los documentos requeridos.`,
          HttpStatus.CONFLICT,
        );
      }
    }

    const userIdType = await this.userIdTypeRepository.findOne({
      where: {
        id: medicalReqPerson.patient_id_type,
      },
    });

    if (!userIdType) {
      throw new HttpException(
        'El tipo de documento de identidad del paciente no es valido',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const medicalReqType = await this.medicalReqTypeRepository.findOne({
      where: { id: medicalReqPerson.requirement_type },
    });

    if (!medicalReqType) {
      throw new HttpException(
        'El tipo de requerimiento médico no es valido',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const reqStatusPending = await this.requerimentStatusRepository.findOne({
      where: { name: RequirementStatusEnum.PENDING },
    });

    if (!reqStatusPending) {
      throw new HttpException(
        'El estado "Pendiente" de requerimiento no existe',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const insertStatusPending = new CreateMedicalReqPersonDto();

    insertStatusPending.requirement_status = reqStatusPending.id;

    const createMedicalReqPerson =
      await this.medicalReqRepository.save(medicalReqPerson);

    await this.medicalReqRepository.update(
      createMedicalReqPerson.id,
      aplicantPersonDetails,
    );

    await this.medicalReqRepository.update(
      createMedicalReqPerson.id,
      insertStatusPending,
    );

    const medicalReqCompleted = await this.medicalReqRepository.findOne({
      where: {
        aplicantId: userId,
        id: createMedicalReqPerson.id,
      },
    });

    const sendReqTypeName =
      await this.requirementTypeService.getRequirementTypeById(
        medicalReqCompleted.requirement_type,
      );

    const emailDetailsToSend = new SendEmailDto();

    emailDetailsToSend.recipients = [medicalReqCompleted.aplicant_email];
    emailDetailsToSend.userName = medicalReqCompleted.aplicant_name;
    emailDetailsToSend.medicalReqFilingNumber =
      medicalReqCompleted.filing_number;
    emailDetailsToSend.requirementType = sendReqTypeName.name;
    emailDetailsToSend.subject = SUBJECT_EMAIL_CONFIRM_CREATION;
    emailDetailsToSend.emailTemplate = MEDICAL_REQ_CREATED;

    await this.nodemailerService.sendEmail(emailDetailsToSend);

    return await medicalReqCompleted;
  }

  async createMedicalReqEps(
    userId: string,
    medicalReqEps: CreateMedicalReqEpsDto,
  ) {
    const userEpsFound = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });

    if (!userEpsFound) {
      return new HttpException(
        `El usuario no está registrado.`,
        HttpStatus.CONFLICT,
      );
    }

    const userRoleEps = await this.userRoleRepository.findOne({
      where: {
        id: userEpsFound.user_role,
        name: UserRolType.EPS,
      },
    });

    if (!userRoleEps) {
      throw new HttpException(
        'El usuario debe tener el rol "Eps".',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const aplicantEpsDetails = new CreateMedicalReqEpsDto();

    aplicantEpsDetails.aplicantId = userEpsFound.id;
    aplicantEpsDetails.medicalReqUserType = userEpsFound.user_role;
    aplicantEpsDetails.aplicant_name = userEpsFound.name;
    aplicantEpsDetails.aplicant_last_name = userEpsFound.last_name;
    aplicantEpsDetails.aplicant_gender = userEpsFound.user_gender;
    aplicantEpsDetails.aplicant_id_type = userEpsFound.user_id_type;
    aplicantEpsDetails.aplicant_id_number = userEpsFound.id_number;
    aplicantEpsDetails.aplicant_email = userEpsFound.email;
    aplicantEpsDetails.aplicant_eps_company = userEpsFound.eps_company;
    aplicantEpsDetails.aplicant_company_area = userEpsFound.company_area;

    const currentDate = new Date();
    aplicantEpsDetails.date_of_admission = currentDate;

    const userIdType = await this.userIdTypeRepository.findOne({
      where: {
        id: medicalReqEps.patient_id_type,
      },
    });

    if (!userIdType) {
      throw new HttpException(
        'El tipo de documento de identidad del paciente no es valido',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const medicalReqType = await this.medicalReqTypeRepository.findOne({
      where: { id: medicalReqEps.requirement_type },
    });

    if (!medicalReqType) {
      throw new HttpException(
        'El tipo de requerimiento médico no es valido',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const reqStatusPending = await this.requerimentStatusRepository.findOne({
      where: { name: RequirementStatusEnum.PENDING },
    });

    if (!reqStatusPending) {
      throw new HttpException(
        'El estado "Pendiente" de requerimiento no existe',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const insertStatusPending = new CreateMedicalReqEpsDto();

    insertStatusPending.requirement_status = reqStatusPending.id;

    const createMedicalReq =
      await this.medicalReqRepository.save(medicalReqEps);

    await this.medicalReqRepository.update(
      createMedicalReq.id,
      aplicantEpsDetails,
    );

    await this.medicalReqRepository.update(
      createMedicalReq.id,
      insertStatusPending,
    );

    const medicalReqCompleted = await this.medicalReqRepository.findOne({
      where: {
        aplicantId: userId,
        id: createMedicalReq.id,
      },
    });

    const sendReqTypeName =
      await this.requirementTypeService.getRequirementTypeById(
        medicalReqCompleted.requirement_type,
      );

    const emailDetailsToSend = new SendEmailDto();

    emailDetailsToSend.recipients = [medicalReqCompleted.aplicant_email];
    emailDetailsToSend.userName = medicalReqCompleted.aplicant_name;
    emailDetailsToSend.medicalReqFilingNumber =
      medicalReqCompleted.filing_number;
    emailDetailsToSend.requirementType = sendReqTypeName.name;
    emailDetailsToSend.subject = SUBJECT_EMAIL_CONFIRM_CREATION;
    emailDetailsToSend.emailTemplate = MEDICAL_REQ_CREATED;

    await this.nodemailerService.sendEmail(emailDetailsToSend);

    return await medicalReqCompleted;
  }

  // GET FUNTIONS //

  async getAllMedicalReqUsers() {
    const allMedicalReqUsers = await this.medicalReqRepository.find({
      where: {
        is_deleted: false,
      },
      order: {
        createdAt: 'ASC',
      },
    });

    if (allMedicalReqUsers.length === 0) {
      return new HttpException(
        `No hay requerimientos creados actualmente.`,
        HttpStatus.CONFLICT,
      );
    } else {
      return allMedicalReqUsers;
    }
  }

  async getAllMedicalReqPerson() {
    const userRolePerson = await this.userRoleRepository.findOne({
      where: {
        name: UserRolType.PATIENT,
      },
    });

    const allMedicalReqPerson = await this.medicalReqRepository.find({
      where: {
        medicalReqUserType: userRolePerson.id,
        is_deleted: false,
      },
      order: {
        createdAt: 'ASC',
      },
    });

    if (allMedicalReqPerson.length === 0) {
      return new HttpException(
        `No hay requerimientos creados actualmente.`,
        HttpStatus.CONFLICT,
      );
    } else {
      return allMedicalReqPerson;
    }
  }

  async getAllMedicalReqEps() {
    const userRoleEps = await this.userRoleRepository.findOne({
      where: {
        name: UserRolType.EPS,
      },
    });

    const allMedicalReqEps = await this.medicalReqRepository.find({
      where: {
        medicalReqUserType: userRoleEps.id,
        is_deleted: false,
      },
      order: {
        createdAt: 'ASC',
      },
    });

    if (allMedicalReqEps.length === 0) {
      return new HttpException(
        `No hay requerimientos creados actualmente.`,
        HttpStatus.CONFLICT,
      );
    } else {
      return allMedicalReqEps;
    }
  }

  async getMedicalReqPersonById(id: string) {
    const userRolePerson = await this.userRoleRepository.findOne({
      where: {
        name: UserRolType.PATIENT,
      },
    });

    const medicalReqPersonFound = await this.medicalReqRepository.findOne({
      where: {
        id: id,
        medicalReqUserType: userRolePerson.id,
        is_deleted: false,
      },
      order: {
        createdAt: 'ASC',
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
    const userRoleEps = await this.userRoleRepository.findOne({
      where: {
        name: UserRolType.EPS,
      },
    });

    const medicalReqEpsFound = await this.medicalReqRepository.findOne({
      where: {
        id: id,
        medicalReqUserType: userRoleEps.id,
        is_deleted: false,
      },
      order: {
        createdAt: 'ASC',
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
    const requirementStatus = await this.requerimentStatusRepository.findOne({
      where: { id: newStatusMedicalReq.requirement_status },
    });

    if (!requirementStatus) {
      throw new HttpException(
        'El estado de requerimiento no es valido',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const requerimentStatusName = requirementStatus.name;

    if (requerimentStatusName === RequirementStatusEnum.DELIVERED) {
      const currentDate = new Date();

      const sevenDaysLater = new Date();
      sevenDaysLater.setDate(sevenDaysLater.getDate() + 7);

      newStatusMedicalReq.answer_date = currentDate;
      newStatusMedicalReq.download_expiration_date = sevenDaysLater;

      await this.medicalReqRepository.update(id, newStatusMedicalReq);
    }

    const updateMedicalReq = await this.medicalReqRepository.update(
      id,
      newStatusMedicalReq,
    );

    const updatedMedicalReqFound = await this.medicalReqRepository.findOne({
      where: {
        id: id,
      },
    });

    const sendReqTypeName =
      await this.requirementTypeService.getRequirementTypeById(
        updatedMedicalReqFound.requirement_type,
      );

    const emailDetailsToSend = new SendEmailDto();

    emailDetailsToSend.recipients = [updatedMedicalReqFound.aplicant_email];
    emailDetailsToSend.userName = updatedMedicalReqFound.aplicant_name;
    emailDetailsToSend.medicalReqFilingNumber =
      updatedMedicalReqFound.filing_number;
    emailDetailsToSend.requirementType = sendReqTypeName.name;
    emailDetailsToSend.requestStatusReq = requerimentStatusName;
    emailDetailsToSend.subject = SUBJECT_EMAIL_STATUS_CHANGE;
    emailDetailsToSend.emailTemplate = MEDICAL_REQ_UPDATE;

    await this.nodemailerService.sendEmail(emailDetailsToSend);

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
