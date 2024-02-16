import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MedicalReq } from '../entities/medical_req.entity';
import { CreateMedicalReqDto } from '../dto/create_medical_req.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class MedicalReqService {
  constructor(
    @InjectRepository(MedicalReq)
    private medicalReqRepository: Repository<MedicalReq>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createMedicalReq(medicalReq: CreateMedicalReqDto, userId: string) {
    const userFound = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });

    if (!userFound) {
      return new HttpException(
        `El usuario no está registrado.`,
        HttpStatus.CONFLICT,
      );
    }

    const newMedicalReq = new MedicalReq();

    newMedicalReq.aplicant_name = userFound.name;
    newMedicalReq.aplicant_last_name = userFound.last_name;
    newMedicalReq.aplicant_id_type = userFound.id_type;
    newMedicalReq.aplicant_id_number = userFound.id_number;
    newMedicalReq.aplicant_email = userFound.email;
    newMedicalReq.aplicant_cellphone = userFound.cellphone;

    // if (newMedicalReq) {
    //   this.medicalReqRepository.save(newMedicalReq);
    // }

    console.log(newMedicalReq);
    console.log(medicalReq);
    await this.medicalReqRepository.save(medicalReq);
    await this.medicalReqRepository.save(newMedicalReq);

    return medicalReq;
  }

  getMedicalReq() {}
}
