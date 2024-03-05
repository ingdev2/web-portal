import { Controller, Get, Param } from '@nestjs/common';
import { DeptsAndCitiesService } from '../services/depts_and_cities.service';

@Controller('departments')
export class DeptsAndCitiesController {
  constructor(private readonly deptsAndCitiesService: DeptsAndCitiesService) {}

  @Get('/')
  getDepartmentsAndMunicipalities(): Promise<any> {
    return this.deptsAndCitiesService.getDepartmentsAndMunicipalities();
  }

  @Get('/:departmentId/cities')
  async getCitiesByDepartment(
    @Param('departmentId') departmentId: number,
  ): Promise<string[] | null> {
    return this.deptsAndCitiesService.getCitiesByDepartment(departmentId);
  }
}
