import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { DeptsAndCitiesService } from '../services/depts_and_cities.service';
import { SelectLocationDto } from '../dto/select_location.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('departments-and-cities')
@ApiBearerAuth()
@Controller('departments')
export class DeptsAndCitiesController {
  constructor(private readonly deptsAndCitiesService: DeptsAndCitiesService) {}

  @Get('/')
  getDepartmentsAndMunicipalities(): Promise<Department[]> {
    return this.deptsAndCitiesService.getDepartmentsAndMunicipalities();
  }

  @Get('/:departmentName/cities')
  async getCitiesByDepartment(
    @Param('departmentName') departmentName: string,
  ): Promise<string[] | null> {
    return this.deptsAndCitiesService.getCitiesByDepartment(departmentName);
  }

  @Post('/selectLocation')
  async getLocationByDepartmentAndCity(
    @Body() { department_name, city_name }: SelectLocationDto,
  ): Promise<SelectLocationDto> {
    return this.deptsAndCitiesService.getLocationByDepartmentAndCity({
      department_name,
      city_name,
    });
  }
}
