import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EpsCompanyService } from '../services/eps_company.service';
import { CreateEpsCompanyDto } from '../dto/create-eps_company.dto';
import { UpdateEpsCompanyDto } from '../dto/update-eps_company.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth } from '../../auth/decorators/auth.decorator';
import { AdminRolType } from '../../utils/enums/admin_roles.enum';

@ApiTags('eps-company')
@ApiBearerAuth()
@Auth(AdminRolType.SUPER_ADMIN, AdminRolType.ADMIN)
@Controller('eps-company')
export class EpsCompanyController {
  constructor(private readonly epsCompanyService: EpsCompanyService) {}

  // POST METHODS //

  @Post('/create')
  createEpsCompany(@Body() createEpsCompany: CreateEpsCompanyDto) {
    return this.epsCompanyService.createEpsCompany(createEpsCompany);
  }

  // GET METHODS //

  @Get('/getAll')
  getAllEpsCompanies() {
    return this.epsCompanyService.getAllEpsCompanies();
  }

  // PATCH METHODS //

  @Patch('/update/:id')
  updateEpsCompany(
    @Param('id') id: number,
    @Body() updateCompanyArea: UpdateEpsCompanyDto,
  ) {
    return this.epsCompanyService.updateEpsCompany(id, updateCompanyArea);
  }
}
