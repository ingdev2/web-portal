import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArrayContains, DeepPartial, Raw, Repository } from 'typeorm';
import { AuthorizedFamiliar } from '../entities/authorized_familiar.entity';
import { User } from '../../users/entities/user.entity';
import { UserRole } from '../../user_roles/entities/user_role.entity';
import { UserRolType } from 'src/common/enums/user_roles.enum';
import { IdTypeEntity } from '../../id_types/entities/id_type.entity';
import { CreateAuthorizedFamiliarDto } from '../dto/create-authorized_familiar.dto';
import { UpdateAuthorizedFamiliarDto } from '../dto/update-authorized_familiar.dto';
import { UUID } from 'crypto';

@Injectable()
export class AuthorizedFamiliarService {
  constructor(
    @InjectRepository(AuthorizedFamiliar)
    private familiarRepository: Repository<AuthorizedFamiliar>,

    @InjectRepository(User) private userRepository: Repository<User>,

    @InjectRepository(UserRole)
    private userRoleRepository: Repository<UserRole>,

    @InjectRepository(IdTypeEntity)
    private idTypeRepository: Repository<IdTypeEntity>,
  ) {}

  // CREATE FUNTIONS //

  async createUserFamiliar(
    userId: UUID,
    familiar: CreateAuthorizedFamiliarDto,
  ) {
    const patientFound = await this.userRepository.findOne({
      where: {
        id: userId,
        is_active: true,
      },
    });

    if (!patientFound) {
      return new HttpException(
        `El paciente no se encuentra registrado.`,
        HttpStatus.CONFLICT,
      );
    }

    const patientWithFamiliarFound = await this.familiarRepository.findOne({
      where: {
        id_number: familiar.id_number,
        patients_id: ArrayContains([userId]),
      },
    });

    if (patientWithFamiliarFound) {
      return new HttpException(
        `El familiar con número de identificación: ${familiar.id_number} ya está registrado con este paciente.`,
        HttpStatus.CONFLICT,
      );
    }

    var familiarAnAssignedPatient = await this.familiarRepository.findOne({
      where: {
        id_number: familiar.id_number,
      },
    });

    if (familiarAnAssignedPatient) {
      const addAnotherPatient = new CreateAuthorizedFamiliarDto();

      Object.assign(addAnotherPatient, familiarAnAssignedPatient);

      addAnotherPatient.patients_id.push(userId);

      await this.familiarRepository.update(
        familiarAnAssignedPatient.id,
        addAnotherPatient,
      );

      const familiarWithAnotherPatient =
        await await this.familiarRepository.findOne({
          where: {
            id_number: familiar.id_number,
          },
        });

      const patientFamiliar = await this.userRepository.findOne({
        where: { id: userId },
      });
      const familiarPatient = await this.familiarRepository.findOne({
        where: { id: familiarWithAnotherPatient.id },
      });

      await patientFamiliar.familiar.push(familiarPatient);

      await this.userRepository.save(patientFamiliar);

      return familiarWithAnotherPatient;
    }

    const roleFamiliarFound = await this.userRoleRepository.findOne({
      where: {
        name: UserRolType.AUTHORIZED_FAMILIAR,
      },
    });

    if (!roleFamiliarFound) {
      throw new HttpException(
        'El rol "Familiar Autorizado" no existe.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const insertRoleFamiliar = await this.familiarRepository.create({
      ...familiar,
      user_role: roleFamiliarFound.id,
      patients_id: [patientFound.id],
      accept_terms: true,
    } as DeepPartial<AuthorizedFamiliar>);

    const familiarWithRole =
      await this.familiarRepository.save(insertRoleFamiliar);

    const familiarRole = await this.userRoleRepository.findOne({
      where: {
        id: familiarWithRole.user_role,
        name: UserRolType.AUTHORIZED_FAMILIAR,
      },
    });

    if (!familiarRole) {
      throw new HttpException(
        'El usuario debe tener el rol "Familiar Autorizado".',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    await this.familiarRepository.update(familiarWithRole.id, familiarWithRole);

    const newFamiliar = await this.familiarRepository.findOne({
      where: { id: familiarWithRole.id },
    });

    const patientFamiliar = await this.userRepository.findOne({
      where: { id: userId },
    });
    const familiarPatient = await this.familiarRepository.findOne({
      where: { id: newFamiliar.id },
    });

    await patientFamiliar.familiar.push(familiarPatient);

    await this.userRepository.save(patientFamiliar);

    return newFamiliar;
  }

  // GET FUNTIONS //

  async getAllRelatives() {
    const userRoleFamiliar = await this.userRoleRepository.findOne({
      where: {
        name: UserRolType.AUTHORIZED_FAMILIAR,
      },
    });

    if (userRoleFamiliar) {
      const allUsersFamiliar = await this.familiarRepository.find({
        where: {
          role: userRoleFamiliar,
          is_active: true,
        },
        order: {
          name: 'ASC',
        },
      });

      if (!allUsersFamiliar.length) {
        return new HttpException(
          `No hay familiares registrados en la base de datos`,
          HttpStatus.CONFLICT,
        );
      } else {
        return allUsersFamiliar;
      }
    } else {
      throw new HttpException(
        'No hay role creado de "Familiar".',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getFamiliarById(id: string) {
    const userFamiliarFound = await this.familiarRepository.findOne({
      where: {
        id: id,
        is_active: true,
      },
      // relations: ['medical_req'],
    });

    if (!userFamiliarFound) {
      return new HttpException(
        `El usuario con número de ID: ${id} no esta registrado.`,
        HttpStatus.CONFLICT,
      );
    } else {
      return userFamiliarFound;
    }
  }

  async getFamiliarByIdNumber(idNumber: number) {
    const familiarFound = await this.familiarRepository.findOne({
      where: {
        id_number: idNumber,
      },
    });

    if (!familiarFound) {
      return new HttpException(
        `El familiar con número de identificación personal: ${idNumber} no esta registrado.`,
        HttpStatus.CONFLICT,
      );
    } else {
      return familiarFound;
    }
  }

  // UPDATE FUNTIONS //

  async updateUserFamiliar(
    id: string,
    userFamiliar: UpdateAuthorizedFamiliarDto,
  ) {
    const familiarFound = await this.familiarRepository.findOneBy({ id });

    if (!familiarFound) {
      return new HttpException(
        `Usuario no encontrado.`,
        HttpStatus.UNAUTHORIZED,
      );
    }

    const userRoleFamiliar = await this.userRoleRepository.findOne({
      where: {
        name: UserRolType.AUTHORIZED_FAMILIAR,
      },
    });

    if (familiarFound.user_role !== userRoleFamiliar.id) {
      return new HttpException(
        `No tienes permiso para actualizar este usuario.`,
        HttpStatus.UNAUTHORIZED,
      );
    }

    const updateUserFamiliar = await this.familiarRepository.update(
      id,
      userFamiliar,
    );

    if (updateUserFamiliar.affected === 0) {
      return new HttpException(`Usuario no encontrado`, HttpStatus.CONFLICT);
    }

    return new HttpException(
      `¡Datos guardados correctamente!`,
      HttpStatus.ACCEPTED,
    );
  }

  // DELETED-BAN FUNTIONS //

  async banRelatives(id: string) {
    const familiarFound = await this.familiarRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!familiarFound) {
      return new HttpException(
        `El familiar con número de ID: ${id} no esta registrado.`,
        HttpStatus.CONFLICT,
      );
    }

    familiarFound.is_active = !familiarFound.is_active;

    await this.familiarRepository.save(familiarFound);

    return new HttpException(
      `El familiar con número de identidad: ${familiarFound.id_number} está con estado activo: ${familiarFound.is_active}`,
      HttpStatus.CONFLICT,
    );
  }
}
