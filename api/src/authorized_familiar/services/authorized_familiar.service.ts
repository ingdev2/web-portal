import { Injectable } from '@nestjs/common';
import { CreateAuthorizedFamiliarDto } from '../dto/create-authorized_familiar.dto';
import { UpdateAuthorizedFamiliarDto } from '../dto/update-authorized_familiar.dto';

@Injectable()
export class AuthorizedFamiliarService {
  create(createAuthorizedFamiliarDto: CreateAuthorizedFamiliarDto) {
    return 'This action adds a new authorizedFamiliar';
  }

  findAll() {
    return `This action returns all authorizedFamiliar`;
  }

  findOne(id: number) {
    return `This action returns a #${id} authorizedFamiliar`;
  }

  update(id: number, updateAuthorizedFamiliarDto: UpdateAuthorizedFamiliarDto) {
    return `This action updates a #${id} authorizedFamiliar`;
  }

  remove(id: number) {
    return `This action removes a #${id} authorizedFamiliar`;
  }
}
