import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MedicalReq } from '../entities/medical_req.entity';
import { CreateMedicalReqDto } from '../dto/create_medical_req.dto';
import { User, UserRolType } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/services/users.service';

@Injectable()
export class MedicalReqService {
  constructor(
    @InjectRepository(MedicalReq)
    private medicalReqRepository: Repository<MedicalReq>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
    private usersService: UsersService,
  ) {}

  async createMedicalReqPerson(
    userId: string,
    medicalReq: CreateMedicalReqDto,
  ) {
    const userFound = await this.userRepository.findOne({
      where: {
        id: userId,
        rol: UserRolType.PERSON,
      },
    });

    if (!userFound) {
      return new HttpException(
        `El usuario no está registrado.`,
        HttpStatus.CONFLICT,
      );
    }

    const aplicantDetails = new CreateMedicalReqDto();

    aplicantDetails.aplicantId = userFound.id;
    aplicantDetails.aplicant_name = userFound.name;
    aplicantDetails.aplicant_last_name = userFound.last_name;
    aplicantDetails.aplicant_id_type = userFound.id_type;
    aplicantDetails.aplicant_id_number = userFound.id_number;
    aplicantDetails.aplicant_email = userFound.email;
    aplicantDetails.aplicant_cellphone = userFound.cellphone;

    const currentDate = new Date();
    aplicantDetails.date_of_admission = currentDate;

    if (medicalReq.right_petition && !medicalReq.copy_right_petition) {
      return new HttpException(
        `No se ha adjuntado el documento de derecho de petición.`,
        HttpStatus.CONFLICT,
      );
    }

    if (
      !medicalReq.copy_applicant_citizenship_card &&
      !medicalReq.copy_cohabitation_certificate &&
      !medicalReq.copy_marriage_certicate &&
      !medicalReq.copy_parents_citizenship_card &&
      !medicalReq.copy_patient_citizenship_card &&
      !medicalReq.copy_patient_civil_registration
    ) {
      return new HttpException(
        `No se ha adjuntado ningún documento.`,
        HttpStatus.CONFLICT,
      );
    }

    const createMedicalReq = await this.medicalReqRepository.save(medicalReq);

    await this.medicalReqRepository.update(
      createMedicalReq.id,
      aplicantDetails,
    );

    return await createMedicalReq;
  }

  getMedicalReq() {}
}
