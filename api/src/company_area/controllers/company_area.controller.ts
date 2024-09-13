import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Req,
} from '@nestjs/common';
import { CompanyAreaService } from '../services/company_area.service';
import { CreateCompanyAreaDto } from '../dto/create-company_area.dto';
import { UpdateCompanyAreaDto } from '../dto/update-company_area.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth } from '../../auth/decorators/auth.decorator';
import { AdminRolType } from '../../utils/enums/admin_roles.enum';
import { CompanyAreaEnum } from 'src/utils/enums/company_area.enum';
import { EnableAuditLog } from 'src/audit_logs/decorators/enable-audit-log.decorator';

@ApiTags('company-area')
@ApiBearerAuth()
@Controller('company-area')
export class CompanyAreaController {
  constructor(private readonly companyAreaService: CompanyAreaService) {}

  // POST METHODS //

  @EnableAuditLog()
  @Auth(AdminRolType.SUPER_ADMIN)
  @Post('/create')
  createCompanyArea(
    @Body() createCompanyArea: CreateCompanyAreaDto,
    @Req() requestAuditLog: any,
  ) {
    return this.companyAreaService.createCompanyArea(
      createCompanyArea,
      requestAuditLog,
    );
  }

  // GET METHODS //

  @Get('/getAll')
  getAllCompanyAreas() {
    return this.companyAreaService.getAllCompanyAreas();
  }

  @Get('/getCompanyArea/:id')
  getCompanyAreaById(@Param('id') id: number) {
    return this.companyAreaService.getCompanyAreaById(id);
  }

  @Get('/getByName')
  getCompanyAreaByName(@Query('name') name?: CompanyAreaEnum) {
    return this.companyAreaService.getCompanyAreaByName(name);
  }
  // PATCH METHODS //

  @EnableAuditLog()
  @Auth(AdminRolType.SUPER_ADMIN, AdminRolType.ADMIN)
  @Patch('/update/:id')
  updateCompanyArea(
    @Param('id') id: number,
    @Body() updateCompanyArea: UpdateCompanyAreaDto,
    @Req() requestAuditLog: any,
  ) {
    return this.companyAreaService.updateCompanyArea(
      id,
      updateCompanyArea,
      requestAuditLog,
    );
  }
}
