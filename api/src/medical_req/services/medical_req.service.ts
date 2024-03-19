import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { MedicalReq } from '../entities/medical_req.entity';
import { AuthorizedFamiliar } from '../../authorized_familiar/entities/authorized_familiar.entity';
import { CreateMedicalReqFamiliarDto } from '../dto/create_medical_req_familiar.dto';
import { CreateMedicalReqPatientDto } from '../dto/create_medical_req_patient.dto';
import { CreateMedicalReqEpsDto } from '../dto/create_medical_req_eps.dto';
import { UpdateStatusMedicalReqDto } from '../dto/update_status_medical_req.dto';
import { User } from '../../users/entities/user.entity';
import { UserRole } from '../../user_roles/entities/user_role.entity';
import { UserRolType } from '../../common/enums/user_roles.enum';
import { RequirementType } from '../../requirement_type/entities/requirement_type.entity';
import { PatientClassStatus } from '../../patient_class_status/entities/patient_class_status.entity';
import { PatientClassificationStatus } from '../enums/patient_classification_status.enum';
import { IdTypeEntity } from '../../id_types/entities/id_type.entity';
import { IdType } from '../../common/enums/id_type.enum';
import { IdTypeAbbrev } from '../../users/enums/id_type_abbrev.enum';
import { RelWithPatient } from '../../rel_with_patient/entities/rel_with_patient.entity';
import { RelationshipWithPatient } from '../enums/relationship_with_patient.enum';
import { RequirementStatus } from '../../requirement_status/entities/requirement_status.entity';
import { RequirementStatusEnum } from '../enums/requirement_status.enum';
import { UsersService } from '../../users/services/users.service';
import { RequirementTypeService } from '../../requirement_type/services/requirement_type.service';
import { NodemailerService } from '../../nodemailer/services/nodemailer.service';
import { SendEmailDto } from '../../nodemailer/dto/send_email.dto';
import { ReasonsForRejection } from '../../reasons_for_rejection/entities/reasons_for_rejection.entity';
import { generateFilingNumber } from '../helpers/generate_filing_number.helper';
import {
  MEDICAL_REQ_CREATED,
  MEDICAL_REQ_UPDATE,
  SUBJECT_EMAIL_CONFIRM_CREATION,
  SUBJECT_EMAIL_STATUS_CHANGE,
} from '../../nodemailer/constants/email_config.constant';
import { EntityManager } from 'typeorm';

const schedule = require('node-schedule');

@Injectable()
export class MedicalReqService {
  constructor(
    @InjectRepository(MedicalReq)
    private medicalReqRepository: Repository<MedicalReq>,

    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(AuthorizedFamiliar)
    private familiarRepository: Repository<AuthorizedFamiliar>,

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

    @InjectRepository(ReasonsForRejection)
    private reasonsForRejectionRepository: Repository<ReasonsForRejection>,

    private usersService: UsersService,
    private nodemailerService: NodemailerService,
    private requirementTypeService: RequirementTypeService,
    private entityManager: EntityManager,
  ) {}

  // CREATE FUNTIONS //

  async createMedicalReqFamiliar(
    familiarId: string,
    medicalReqFamiliar: CreateMedicalReqFamiliarDto,
  ) {
    const userPatientFound = await this.userRepository.findOne({
      where: {
        user_id_type: medicalReqFamiliar.patient_id_type,
        id_number: medicalReqFamiliar.patient_id_number,
      },
    });

    if (!userPatientFound) {
      return new HttpException(
        `El usuario paciente no está registrado.`,
        HttpStatus.CONFLICT,
      );
    }

    const userRolePatient = await this.userRoleRepository.findOne({
      where: {
        id: userPatientFound.user_role,
        name: UserRolType.PATIENT,
      },
    });

    if (!userRolePatient) {
      throw new HttpException(
        'El usuario debe tener el rol "Paciente".',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const verifiedFamiliar = await this.familiarRepository.findOne({
      where: {
        id: familiarId,
        patient_id: userPatientFound.id,
        rel_with_patient: medicalReqFamiliar.relationship_with_patient,
      },
    });

    if (!verifiedFamiliar) {
      throw new HttpException(
        'El familiar no tiene parentesco con el paciente.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const userRoleFamiliar = await this.userRoleRepository.findOne({
      where: {
        id: verifiedFamiliar.user_role,
        name: UserRolType.AUTHORIZED_FAMILIAR,
      },
    });

    if (!userRoleFamiliar) {
      throw new HttpException(
        'El usuario debe tener el rol "Familiar Autorizado".',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const reqStatusPending = await this.requerimentStatusRepository.findOne({
      where: { name: RequirementStatusEnum.UNDER_REVIEW },
    });

    if (!reqStatusPending) {
      throw new HttpException(
        'El estado "En Revisión" de requerimiento no existe',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const filingNumber = await generateFilingNumber(this.entityManager);

    const aplicantFamiliarDetails = new CreateMedicalReqFamiliarDto();

    aplicantFamiliarDetails.filing_number = filingNumber;

    aplicantFamiliarDetails.familiar_id = verifiedFamiliar.id;
    aplicantFamiliarDetails.patient_name = userPatientFound.name;
    aplicantFamiliarDetails.medicalReqUserType = verifiedFamiliar.user_role;
    aplicantFamiliarDetails.aplicant_name = verifiedFamiliar.name;
    aplicantFamiliarDetails.aplicant_last_name = verifiedFamiliar.last_name;
    aplicantFamiliarDetails.aplicant_gender = verifiedFamiliar.user_gender;
    aplicantFamiliarDetails.aplicant_id_type = verifiedFamiliar.user_id_type;
    aplicantFamiliarDetails.aplicant_id_number = verifiedFamiliar.id_number;
    aplicantFamiliarDetails.aplicant_email = verifiedFamiliar.email;
    aplicantFamiliarDetails.aplicant_cellphone = verifiedFamiliar.cellphone;
    aplicantFamiliarDetails.right_petition = medicalReqFamiliar.right_petition;
    aplicantFamiliarDetails.accept_terms = true;
    aplicantFamiliarDetails.requirement_status = reqStatusPending.id;
    aplicantFamiliarDetails.patient_id_type = userPatientFound.user_id_type;
    aplicantFamiliarDetails.patient_id_number = userPatientFound.id_number;
    aplicantFamiliarDetails.requirement_type =
      medicalReqFamiliar.requirement_type;

    const currentDate = new Date();
    aplicantFamiliarDetails.date_of_admission = currentDate;

    const {
      right_petition,
      copy_right_petition,
      copy_patient_citizenship_card,
      copy_patient_civil_registration,
      copy_applicant_citizenship_card,
      copy_parents_citizenship_card,
      copy_cohabitation_certificate,
      copy_marriage_certificate,
    } = medicalReqFamiliar;

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
      where: { id: medicalReqFamiliar.patient_class_status },
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
      where: { id: medicalReqFamiliar.relationship_with_patient },
    });

    const verifiedRelationshipWithPatient =
      await this.familiarRepository.findOne({
        where: {
          rel_with_patient: relWithPatient.id,
        },
      });

    if (!relWithPatient || !verifiedRelationshipWithPatient) {
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
        id: medicalReqFamiliar.patient_id_type,
      },
    });

    if (!userIdType) {
      throw new HttpException(
        'El tipo de documento de identidad del paciente no es valido',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const medicalReqType = await this.medicalReqTypeRepository.findOne({
      where: { id: medicalReqFamiliar.requirement_type },
    });

    if (!medicalReqType) {
      throw new HttpException(
        'El tipo de requerimiento médico no es valido',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const createMedicalReqFamiliar = await this.medicalReqRepository.save(
      aplicantFamiliarDetails,
    );

    const documentsFamiliarDetails = new CreateMedicalReqFamiliarDto();

    documentsFamiliarDetails.copy_right_petition =
      medicalReqFamiliar?.copy_right_petition;
    documentsFamiliarDetails.patient_class_status =
      medicalReqFamiliar?.patient_class_status;
    documentsFamiliarDetails.relationship_with_patient =
      medicalReqFamiliar?.relationship_with_patient;
    documentsFamiliarDetails.copy_applicant_citizenship_card =
      medicalReqFamiliar?.copy_applicant_citizenship_card;
    documentsFamiliarDetails.copy_patient_citizenship_card =
      medicalReqFamiliar?.copy_patient_citizenship_card;
    documentsFamiliarDetails.copy_patient_civil_registration =
      medicalReqFamiliar?.copy_patient_civil_registration;
    documentsFamiliarDetails.copy_parents_citizenship_card =
      medicalReqFamiliar?.copy_parents_citizenship_card;
    documentsFamiliarDetails.copy_marriage_certificate =
      medicalReqFamiliar?.copy_marriage_certificate;
    documentsFamiliarDetails.user_message = medicalReqFamiliar?.user_message;

    await this.medicalReqRepository.update(
      createMedicalReqFamiliar.id,
      documentsFamiliarDetails,
    );

    const medicalReqCompleted = await this.medicalReqRepository.findOne({
      where: {
        id: createMedicalReqFamiliar.id,
        familiar_id: verifiedFamiliar.id,
      },
    });

    if (medicalReqCompleted.copy_applicant_citizenship_card) {
      const citizenshipCard =
        medicalReqCompleted.copy_applicant_citizenship_card;

      await this.familiarRepository.update(
        { id: verifiedFamiliar.id },
        { copy_familiar_citizenship_card: null },
      );

      await this.familiarRepository.update(
        { id: verifiedFamiliar.id },
        { copy_familiar_citizenship_card: citizenshipCard },
      );
    }

    const sendReqTypeName =
      await this.requirementTypeService.getRequirementTypeById(
        medicalReqCompleted.requirement_type,
      );

    const emailDetailsToSend = new SendEmailDto();

    emailDetailsToSend.recipients = [medicalReqCompleted.aplicant_email];
    emailDetailsToSend.userName = medicalReqCompleted.aplicant_name;
    emailDetailsToSend.pacientName = userPatientFound.name;
    emailDetailsToSend.pacientIdNumber = userPatientFound.id_number;
    emailDetailsToSend.medicalReqFilingNumber =
      medicalReqCompleted.filing_number;
    emailDetailsToSend.requirementType = sendReqTypeName.name;
    emailDetailsToSend.subject = SUBJECT_EMAIL_CONFIRM_CREATION;
    emailDetailsToSend.emailTemplate = MEDICAL_REQ_CREATED;

    await this.nodemailerService.sendEmail(emailDetailsToSend);

    return medicalReqCompleted;
  }

  async createMedicalReqPatient(
    userId: string,
    medicalReqPatient: CreateMedicalReqPatientDto,
  ) {
    const userPatientFound = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });

    if (!userPatientFound) {
      return new HttpException(
        `El usuario no está registrado.`,
        HttpStatus.CONFLICT,
      );
    }

    const userRolePatient = await this.userRoleRepository.findOne({
      where: {
        id: userPatientFound.user_role,
        name: UserRolType.PATIENT,
      },
    });

    if (!userRolePatient) {
      throw new HttpException(
        'El usuario debe tener el rol "Paciente".',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const idTypeOfPatient = await this.userIdTypeRepository.findOne({
      where: {
        id: userPatientFound.user_id_type,
      },
    });

    const idTypeName = idTypeOfPatient.name;

    const idTypeAbbreviations: Record<string, string> = {
      [IdType.CITIZENSHIP_CARD]: IdTypeAbbrev.CÉDULA_DE_CIUDADANÍA,
      [IdType.FOREIGNER_ID]: IdTypeAbbrev.CÉDULA_DE_EXTRANJERÍA,
      [IdType.IDENTITY_CARD]: IdTypeAbbrev.TARJETA_DE_IDENTIDAD,
      [IdType.CIVIL_REGISTRATION]: IdTypeAbbrev.REGISTRO_CIVIL,
      [IdType.PASSPORT]: IdTypeAbbrev.PASAPORTE,
      [IdType.SPECIAL_RESIDENCE_PERMIT]:
        IdTypeAbbrev.PERMISO_ESPECIAL_PERMANENCIA,
      [IdType.TEMPORARY_PROTECTION_PERMIT]:
        IdTypeAbbrev.PERMISO_PROTECCIÓN_TEMPORAL,
      [IdType.MINOR_WITHOUT_IDENTIFICATION]:
        IdTypeAbbrev.MENOR_SIN_IDENTIFICACIÓN,
      [IdType.ADULT_WITHOUT_IDENTIFICATION]:
        IdTypeAbbrev.MAYOR_SIN_IDENTIFICACIÓN,
    };

    const idTypeNameForConsult = idTypeAbbreviations[idTypeName] || '';

    const data = await this.usersService.validateThatThePatientExist({
      idType: idTypeNameForConsult,
      idNumber: userPatientFound.id_number,
    });

    const patientData = data[0]?.data;

    if (!patientData || patientData.length === 0) {
      return new HttpException(
        `El paciente con número de identificación ${medicalReqPatient.patient_id_number} no esta registrado en la base de datos de la clínica.`,
        HttpStatus.CONFLICT,
      );
    }

    const reqStatusPending = await this.requerimentStatusRepository.findOne({
      where: { name: RequirementStatusEnum.UNDER_REVIEW },
    });

    if (!reqStatusPending) {
      throw new HttpException(
        'El estado "En Revisión" de requerimiento no existe',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const filingNumber = await generateFilingNumber(this.entityManager);

    const aplicantPatientDetails = new CreateMedicalReqPatientDto();

    aplicantPatientDetails.filing_number = filingNumber;

    aplicantPatientDetails.aplicantId = userPatientFound.id;
    aplicantPatientDetails.patient_name = userPatientFound.name;
    aplicantPatientDetails.medicalReqUserType = userPatientFound.user_role;
    aplicantPatientDetails.aplicant_name = userPatientFound.name;
    aplicantPatientDetails.aplicant_last_name = userPatientFound.last_name;
    aplicantPatientDetails.aplicant_gender = userPatientFound.user_gender;
    aplicantPatientDetails.aplicant_id_type = userPatientFound.user_id_type;
    aplicantPatientDetails.aplicant_id_number = userPatientFound.id_number;
    aplicantPatientDetails.aplicant_email = userPatientFound.email;
    aplicantPatientDetails.aplicant_cellphone = userPatientFound.cellphone;
    aplicantPatientDetails.accept_terms = true;
    aplicantPatientDetails.requirement_status = reqStatusPending.id;
    aplicantPatientDetails.patient_id_type = userPatientFound.user_id_type;
    aplicantPatientDetails.patient_id_number = userPatientFound.id_number;
    aplicantPatientDetails.requirement_type =
      medicalReqPatient.requirement_type;

    const currentDate = new Date();
    aplicantPatientDetails.date_of_admission = currentDate;

    const userIdType = await this.userIdTypeRepository.findOne({
      where: {
        id: medicalReqPatient.patient_id_type,
      },
    });

    if (!userIdType) {
      throw new HttpException(
        'El tipo de documento de identidad del paciente no es valido',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const medicalReqType = await this.medicalReqTypeRepository.findOne({
      where: { id: medicalReqPatient.requirement_type },
    });

    if (!medicalReqType) {
      throw new HttpException(
        'El tipo de requerimiento médico no es valido',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const createMedicalReq = await this.medicalReqRepository.save(
      aplicantPatientDetails,
    );

    const medicalReqCompleted = await this.medicalReqRepository.findOne({
      where: {
        id: createMedicalReq.id,
        aplicantId: userPatientFound.id,
      },
    });

    if (
      !medicalReqCompleted.patient_id_type ||
      !medicalReqCompleted.patient_id_number
    ) {
      throw new HttpException(
        'El tipo y número de documento de identidad del paciente es requerido',
        HttpStatus.BAD_REQUEST,
      );
    }

    const sendReqTypeName =
      await this.requirementTypeService.getRequirementTypeById(
        medicalReqCompleted.requirement_type,
      );

    const emailDetailsToSend = new SendEmailDto();

    emailDetailsToSend.recipients = [medicalReqCompleted.aplicant_email];
    emailDetailsToSend.userName = medicalReqCompleted.aplicant_name;
    emailDetailsToSend.pacientName = userPatientFound.name;
    emailDetailsToSend.pacientIdNumber = userPatientFound.id_number;
    emailDetailsToSend.medicalReqFilingNumber =
      medicalReqCompleted.filing_number;
    emailDetailsToSend.requirementType = sendReqTypeName.name;
    emailDetailsToSend.subject = SUBJECT_EMAIL_CONFIRM_CREATION;
    emailDetailsToSend.emailTemplate = MEDICAL_REQ_CREATED;

    await this.nodemailerService.sendEmail(emailDetailsToSend);

    return medicalReqCompleted;
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

    const idTypeOfPatient = await this.userIdTypeRepository.findOne({
      where: {
        id: medicalReqEps.patient_id_type,
      },
    });

    const idTypeName = idTypeOfPatient.name;

    const idTypeAbbreviations: Record<string, string> = {
      [IdType.CITIZENSHIP_CARD]: IdTypeAbbrev.CÉDULA_DE_CIUDADANÍA,
      [IdType.FOREIGNER_ID]: IdTypeAbbrev.CÉDULA_DE_EXTRANJERÍA,
      [IdType.IDENTITY_CARD]: IdTypeAbbrev.TARJETA_DE_IDENTIDAD,
      [IdType.CIVIL_REGISTRATION]: IdTypeAbbrev.REGISTRO_CIVIL,
      [IdType.PASSPORT]: IdTypeAbbrev.PASAPORTE,
      [IdType.SPECIAL_RESIDENCE_PERMIT]:
        IdTypeAbbrev.PERMISO_ESPECIAL_PERMANENCIA,
      [IdType.TEMPORARY_PROTECTION_PERMIT]:
        IdTypeAbbrev.PERMISO_PROTECCIÓN_TEMPORAL,
      [IdType.MINOR_WITHOUT_IDENTIFICATION]:
        IdTypeAbbrev.MENOR_SIN_IDENTIFICACIÓN,
      [IdType.ADULT_WITHOUT_IDENTIFICATION]:
        IdTypeAbbrev.MAYOR_SIN_IDENTIFICACIÓN,
    };

    const idTypeNameForConsult = idTypeAbbreviations[idTypeName] || '';

    const data = await this.usersService.validateThatThePatientExist({
      idType: idTypeNameForConsult,
      idNumber: medicalReqEps.patient_id_number,
    });

    const patientData = data[0]?.data;

    if (!patientData || patientData.length === 0) {
      return new HttpException(
        `El paciente con número de identificación ${medicalReqEps.patient_id_number} no esta registrado en la base de datos de la clínica.`,
        HttpStatus.CONFLICT,
      );
    }

    const userPatientFound = await this.userRepository.findOne({
      where: {
        id_number: patientData.ID,
      },
    });

    if (!userPatientFound) {
      return new HttpException(
        `El usuario no está registrado.`,
        HttpStatus.CONFLICT,
      );
    }

    const reqStatusPending = await this.requerimentStatusRepository.findOne({
      where: { name: RequirementStatusEnum.UNDER_REVIEW },
    });

    if (!reqStatusPending) {
      throw new HttpException(
        'El estado "En Revisión" de requerimiento no existe',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const filingNumber = await generateFilingNumber(this.entityManager);

    const aplicantEpsDetails = new CreateMedicalReqEpsDto();

    aplicantEpsDetails.filing_number = filingNumber;

    aplicantEpsDetails.aplicantId = userEpsFound.id;
    aplicantEpsDetails.patient_name = patientData[0]?.NOMBRE;
    aplicantEpsDetails.medicalReqUserType = userEpsFound.user_role;
    aplicantEpsDetails.aplicant_name = userEpsFound.name;
    aplicantEpsDetails.aplicant_last_name = userEpsFound.last_name;
    aplicantEpsDetails.aplicant_gender = userEpsFound.user_gender;
    aplicantEpsDetails.aplicant_id_type = userEpsFound.user_id_type;
    aplicantEpsDetails.aplicant_id_number = userEpsFound.id_number;
    aplicantEpsDetails.aplicant_email = userEpsFound.email;
    aplicantEpsDetails.aplicant_cellphone = userEpsFound.cellphone;
    aplicantEpsDetails.aplicant_eps_company = userEpsFound.eps_company;
    aplicantEpsDetails.aplicant_company_area = userEpsFound.company_area;
    aplicantEpsDetails.accept_terms = true;
    aplicantEpsDetails.requirement_status = reqStatusPending.id;
    aplicantEpsDetails.patient_id_type = userPatientFound.user_id_type;
    aplicantEpsDetails.patient_id_number = userPatientFound.id_number;
    aplicantEpsDetails.requirement_type = medicalReqEps.requirement_type;

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

    const createMedicalReq =
      await this.medicalReqRepository.save(aplicantEpsDetails);

    const medicalReqCompleted = await this.medicalReqRepository.findOne({
      where: {
        id: createMedicalReq.id,
        aplicantId: userEpsFound.id,
      },
    });

    if (
      !medicalReqCompleted.patient_id_type ||
      !medicalReqCompleted.patient_id_number
    ) {
      throw new HttpException(
        'El tipo y número de documento de identidad del paciente es requerido',
        HttpStatus.BAD_REQUEST,
      );
    }

    const sendReqTypeName =
      await this.requirementTypeService.getRequirementTypeById(
        medicalReqCompleted.requirement_type,
      );

    const emailDetailsToSend = new SendEmailDto();

    emailDetailsToSend.recipients = [medicalReqCompleted.aplicant_email];
    emailDetailsToSend.userName = medicalReqCompleted.aplicant_name;
    emailDetailsToSend.pacientName = patientData[0]?.NOMBRE;
    emailDetailsToSend.pacientIdNumber = medicalReqEps.patient_id_number;
    emailDetailsToSend.medicalReqFilingNumber =
      medicalReqCompleted.filing_number;
    emailDetailsToSend.requirementType = sendReqTypeName.name;
    emailDetailsToSend.subject = SUBJECT_EMAIL_CONFIRM_CREATION;
    emailDetailsToSend.emailTemplate = MEDICAL_REQ_CREATED;

    await this.nodemailerService.sendEmail(emailDetailsToSend);

    return medicalReqCompleted;
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

  async getAllMedReqUsersToLegalArea() {
    const allMedicalReqUsersToLegalArea = await this.medicalReqRepository.find({
      where: {
        in_legal_area: true,
        is_deleted: false,
      },
      order: {
        createdAt: 'ASC',
      },
    });

    if (allMedicalReqUsersToLegalArea.length === 0) {
      return new HttpException(
        `No hay requerimientos creados actualmente.`,
        HttpStatus.CONFLICT,
      );
    } else {
      return allMedicalReqUsersToLegalArea;
    }
  }

  async getAllMedicalReqPatient() {
    const userRolePatient = await this.userRoleRepository.findOne({
      where: {
        name: UserRolType.PATIENT,
      },
    });

    const allMedicalReqPatient = await this.medicalReqRepository.find({
      where: {
        medicalReqUserType: userRolePatient.id,
        is_deleted: false,
      },
      order: {
        createdAt: 'ASC',
      },
    });

    if (allMedicalReqPatient.length === 0) {
      return new HttpException(
        `No hay requerimientos creados actualmente.`,
        HttpStatus.CONFLICT,
      );
    } else {
      return allMedicalReqPatient;
    }
  }

  async getAllMedicalReqFamiliar() {
    const userRoleFamiliar = await this.userRoleRepository.findOne({
      where: {
        name: UserRolType.AUTHORIZED_FAMILIAR,
      },
    });

    const allMedicalReqFamiliar = await this.medicalReqRepository.find({
      where: {
        medicalReqUserType: userRoleFamiliar.id,
        is_deleted: false,
      },
      order: {
        createdAt: 'ASC',
      },
    });

    if (allMedicalReqFamiliar.length === 0) {
      return new HttpException(
        `No hay requerimientos creados actualmente.`,
        HttpStatus.CONFLICT,
      );
    } else {
      return allMedicalReqFamiliar;
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

  async getMedicalReqPatientById(id: string) {
    const userRolePatient = await this.userRoleRepository.findOne({
      where: {
        name: UserRolType.PATIENT,
      },
    });

    const medicalReqPatientFound = await this.medicalReqRepository.findOne({
      where: {
        id: id,
        medicalReqUserType: userRolePatient.id,
        is_deleted: false,
      },
      order: {
        createdAt: 'ASC',
      },
    });

    if (!medicalReqPatientFound) {
      return new HttpException(
        `El requerimiento médico con número de ID: ${id} no está registrado.`,
        HttpStatus.CONFLICT,
      );
    } else {
      return medicalReqPatientFound;
    }
  }

  async getMedicalReqFamiliarById(id: string) {
    const userRoleFamiliar = await this.userRoleRepository.findOne({
      where: {
        name: UserRolType.AUTHORIZED_FAMILIAR,
      },
    });

    const medicalReqFamiliarFound = await this.medicalReqRepository.findOne({
      where: {
        id: id,
        medicalReqUserType: userRoleFamiliar.id,
        is_deleted: false,
      },
      order: {
        createdAt: 'ASC',
      },
    });

    if (!medicalReqFamiliarFound) {
      return new HttpException(
        `El requerimiento médico con número de ID: ${id} no está registrado.`,
        HttpStatus.CONFLICT,
      );
    } else {
      return medicalReqFamiliarFound;
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

  async changeStatusToDelivered(
    reqId: string,
    deliveredStatus: UpdateStatusMedicalReqDto,
  ) {
    const requirementFound = await this.medicalReqRepository.findOne({
      where: { id: reqId },
    });

    if (!requirementFound) {
      throw new HttpException(
        'Requerimiento médico no encontrado',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const statusDeliveredFound = await this.requerimentStatusRepository.findOne(
      {
        where: {
          name: RequirementStatusEnum.DELIVERED,
        },
      },
    );

    if (!statusDeliveredFound) {
      throw new HttpException(
        'El estado "Entregado" no existe.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const statusDeliveredId = (deliveredStatus.requirement_status =
      statusDeliveredFound.id);

    const requirementStatusDelivered =
      await this.requerimentStatusRepository.findOne({
        where: { id: statusDeliveredId },
      });

    if (!requirementStatusDelivered) {
      throw new HttpException(
        'El estado de requerimiento no es valido',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const currentDate = new Date();

    const sevenDaysLater = new Date();
    sevenDaysLater.setDate(sevenDaysLater.getDate() + 7);

    deliveredStatus.answer_date = currentDate;
    deliveredStatus.download_expiration_date = sevenDaysLater;

    if (
      deliveredStatus.answer_date &&
      deliveredStatus.download_expiration_date
    ) {
      await this.medicalReqRepository.update(reqId, deliveredStatus);
    }

    const updatedMedicalReqFound = await this.medicalReqRepository.findOne({
      where: {
        id: reqId,
      },
    });

    const statusExpiredFound = await this.requerimentStatusRepository.findOne({
      where: {
        name: RequirementStatusEnum.EXPIRED,
      },
    });

    if (!statusExpiredFound) {
      throw new HttpException(
        'El estado "Expirado" no existe.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const statusExpiredId = statusExpiredFound.id;

    const requirementStatusExpired =
      await this.requerimentStatusRepository.findOne({
        where: { id: statusExpiredId },
      });

    if (!requirementStatusExpired) {
      throw new HttpException(
        'El estado de requerimiento no es valido',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    schedule.scheduleJob(
      new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      async () => {
        await this.medicalReqRepository.update(
          {
            id: updatedMedicalReqFound.id,
          },
          {
            documents_delivered: null,
            requirement_status: requirementStatusExpired.id,
          },
        );
      },
    );

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
    emailDetailsToSend.requestStatusReq = requirementStatusDelivered.name;
    emailDetailsToSend.subject = SUBJECT_EMAIL_STATUS_CHANGE;
    emailDetailsToSend.emailTemplate = MEDICAL_REQ_UPDATE;

    await this.nodemailerService.sendEmail(emailDetailsToSend);

    return updatedMedicalReqFound;
  }

  async changeStatusToRejected(
    reqId: string,
    rejectedStatus: UpdateStatusMedicalReqDto,
  ) {
    const requirementFound = await this.medicalReqRepository.findOne({
      where: { id: reqId },
    });

    if (!requirementFound) {
      throw new HttpException(
        'Requerimiento médico no encontrado',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const motiveOfRejection = await this.reasonsForRejectionRepository.findOne({
      where: {
        id: In(rejectedStatus.motive_for_rejection),
      },
    });

    if (!motiveOfRejection) {
      throw new HttpException(
        'El motivo de rechazo no es valido',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const statusRejectedFound = await this.requerimentStatusRepository.findOne({
      where: {
        name: RequirementStatusEnum.REJECTED,
      },
    });

    if (!statusRejectedFound) {
      throw new HttpException(
        'El estado "Rechazado" no existe.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const statusRejectedId = (rejectedStatus.requirement_status =
      statusRejectedFound.id);

    const requirementStatus = await this.requerimentStatusRepository.findOne({
      where: { id: statusRejectedId },
    });

    if (!requirementStatus) {
      throw new HttpException(
        'El estado de requerimiento no es valido',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    await this.medicalReqRepository.update(reqId, rejectedStatus);

    const updatedMedicalReqFound = await this.medicalReqRepository.findOne({
      where: {
        id: reqId,
      },
      relations: ['reasons_for_rejection'],
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
    emailDetailsToSend.requestStatusReq = requirementStatus.name;
    emailDetailsToSend.subject = SUBJECT_EMAIL_STATUS_CHANGE;
    emailDetailsToSend.emailTemplate = MEDICAL_REQ_UPDATE;

    await this.nodemailerService.sendEmail(emailDetailsToSend);

    const selectedReasonsForRejection =
      await this.reasonsForRejectionRepository.find({
        where: { id: In(rejectedStatus.motive_for_rejection) },
      });

    updatedMedicalReqFound.reasons_for_rejection = [
      ...updatedMedicalReqFound.reasons_for_rejection,
      ...selectedReasonsForRejection,
    ];

    await this.medicalReqRepository.save(updatedMedicalReqFound);

    return updatedMedicalReqFound;
  }

  async sendToLegalArea(
    reqId: string,
    sendtoLegalArea: UpdateStatusMedicalReqDto,
  ) {
    const requirementFound = await this.medicalReqRepository.findOne({
      where: { id: reqId },
    });

    if (!requirementFound) {
      throw new HttpException(
        'Requerimiento médico no encontrado',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    await (sendtoLegalArea.in_legal_area = true);

    await this.medicalReqRepository.update(reqId, sendtoLegalArea);

    const updatedMedicalReqFound = await this.medicalReqRepository.findOne({
      where: {
        id: reqId,
      },
    });

    return updatedMedicalReqFound.in_legal_area;
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
