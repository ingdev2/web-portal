import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CompanyAreaService } from '../services/company_area.service';
import { CreateCompanyAreaDto } from '../dto/create-company_area.dto';
import { UpdateCompanyAreaDto } from '../dto/update-company_area.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth } from '../../auth/decorators/auth.decorator';
import { AdminRolType } from '../../utils/enums/admin_roles.enum';

@ApiTags('company-area')
@ApiBearerAuth()
@Controller('company-area')
export class CompanyAreaController {
  constructor(private readonly companyAreaService: CompanyAreaService) {}

  // POST METHODS //

  @Post('/create')
  createCompanyArea(@Body() createCompanyArea: CreateCompanyAreaDto) {
    return this.companyAreaService.createCompanyArea(createCompanyArea);
  }

  // GET METHODS //

  @Auth(AdminRolType.SUPER_ADMIN)
  @Get('/getAll')
  getAllCompanyAreas() {
    return this.companyAreaService.getAllCompanyAreas();
  }

  // PATCH METHODS //

  @Auth(AdminRolType.SUPER_ADMIN)
  @Patch('/update/:id')
  updateCompanyArea(
    @Param('id') id: number,
    @Body() updateCompanyArea: UpdateCompanyAreaDto,
  ) {
    return this.companyAreaService.updateCompanyArea(id, updateCompanyArea);
  }
}
