import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { AdminsService } from '../services/admins.service';
import { CreateAdminDto } from '../dto/create_admin.dto';
import { CreateSuperAdminDto } from '../dto/create_super_admin.dto';
import { UpdateAdminDto } from '../dto/update_admin.dto';

@Controller('admins')
export class AdminsController {
  constructor(private adminsService: AdminsService) {}

  // POST METHODS //

  @Post('/createSuperAdmin')
  async createSuperAdmin(@Body() newAdmin: CreateSuperAdminDto) {
    return await this.adminsService.createSuperAdmin(newAdmin);
  }

  @Post('/createAdmin')
  async createAdmin(@Body() newAdmin: CreateAdminDto) {
    return await this.adminsService.createAdmin(newAdmin);
  }

  // GET METHODS //

  @Get('/getAllAdmins')
  async getAllAdmins() {
    return this.adminsService.getAllAdmins();
  }

  @Get('/getAdmin/:id')
  async getAdminById(@Param('id') id: number) {
    return await this.adminsService.getAdminById(id);
  }

  // PATCH METHODS //

  @Patch('/updateAdmin/:id')
  async updateAdmin(@Param('id') id: number, @Body() admin: UpdateAdminDto) {
    return await this.adminsService.updateAdmin(id, admin);
  }

  @Patch('/banAdmin/:id')
  async banUsers(@Param('id') id: number) {
    return await this.adminsService.banAdmins(id);
  }
}
