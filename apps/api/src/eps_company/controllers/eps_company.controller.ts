import { Controller, Get, Post, Body, Patch, Param, Req } from '@nestjs/common';
import { EpsCompanyService } from '../services/eps_company.service';
import { CreateEpsCompanyDto } from '../dto/create-eps_company.dto';
import { UpdateEpsCompanyDto } from '../dto/update-eps_company.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AdminRolType } from '../../utils/enums/admin_roles.enum';
import { Auth } from '../../auth/decorators/auth.decorator';
import { EnableAuditLog } from 'src/audit_logs/decorators/enable-audit-log.decorator';

@ApiTags('eps-company')
@ApiBearerAuth()
@Controller('eps-company')
export class EpsCompanyController {
  constructor(private readonly epsCompanyService: EpsCompanyService) {}

  // POST METHODS //

  @EnableAuditLog()
  @Auth(AdminRolType.SUPER_ADMIN, AdminRolType.ADMIN)
  @Post('/create')
  createEpsCompany(
    @Body() createEpsCompany: CreateEpsCompanyDto,
    @Req() requestAuditLog: any,
  ) {
    return this.epsCompanyService.createEpsCompany(
      createEpsCompany,
      requestAuditLog,
    );
  }

  @Post('/updateEpsFromHosvital')
  updateEpsCompaniesFromHosvital() {
    return this.epsCompanyService.updateEpsCompaniesFromHosvital();
  }

  // GET METHODS //

  @Get('/getAllEps')
  validateHosvitalEpsCompanies() {
    return this.epsCompanyService.validateHosvitalEpsCompanies();
  }

  @Get('/getAll')
  getAllEpsCompanies() {
    return this.epsCompanyService.getAllEpsCompanies();
  }

  @Auth(AdminRolType.SUPER_ADMIN, AdminRolType.ADMIN)
  @Get('/getAllAdminDashboard')
  getAllEpsCompaniesAdminDashboard() {
    return this.epsCompanyService.getAllEpsCompaniesAdminDashboard();
  }

  @Get('/getCompany/:id')
  getCompanyById(@Param('id') id: number) {
    return this.epsCompanyService.getCompanyById(id);
  }

  // PATCH METHODS //

  @EnableAuditLog()
  @Auth(AdminRolType.SUPER_ADMIN, AdminRolType.ADMIN)
  @Patch('/update/:id')
  updateEpsCompany(
    @Param('id') id: number,
    @Body() updateCompanyArea: UpdateEpsCompanyDto,
    @Req() requestAuditLog: any,
  ) {
    return this.epsCompanyService.updateEpsCompany(
      id,
      updateCompanyArea,
      requestAuditLog,
    );
  }

  @EnableAuditLog()
  @Auth(AdminRolType.SUPER_ADMIN, AdminRolType.ADMIN)
  @Patch('/ban/:id')
  async banEpsCompanies(@Param('id') id: number, @Req() requestAuditLog: any) {
    return await this.epsCompanyService.banEpsCompanies(id, requestAuditLog);
  }
}
