import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MedicalReq } from '../entities/medical_req.entity';
import { CreateMedicalReqPersonDto } from '../dto/create_medical_req_person.dto';
import { User, UserRolType } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/services/users.service';
import { CreateMedicalReqEpsDto } from '../dto/create_medical_req_eps.dto';

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
        rol: UserRolType.PERSON,
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
        rol: UserRolType.EPS,
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

  getMedicalReq() {}
}
