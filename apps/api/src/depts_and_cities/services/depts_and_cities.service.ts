import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SelectLocationDto } from '../dto/select_location.dto';
import axios from 'axios';

@Injectable()
export class DeptsAndCitiesService {
  async getDepartmentsAndMunicipalities(): Promise<Department[]> {
    try {
      const response = await axios.get(
        'https://raw.githubusercontent.com/marcovega/colombia-json/master/colombia.min.json',
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        'No se pudo obtener la información de ubicación de Colombia',
        HttpStatus.CONFLICT,
      );
    }
  }

  async getCitiesByDepartment(
    departmentName: string,
  ): Promise<string[] | null> {
    const departments = await this.getDepartmentsAndMunicipalities();

    const selectedDepartment = departments.find(
      (dept) => dept.departamento === departmentName,
    );

    return selectedDepartment ? selectedDepartment.ciudades : null;
  }

  async getLocationByDepartmentAndCity({
    department_name,
    city_name,
  }: SelectLocationDto): Promise<SelectLocationDto> {
    const departments = await this.getDepartmentsAndMunicipalities();

    const selectedDepartment = departments.find(
      (dept) => dept.departamento === department_name,
    );

    if (!selectedDepartment) {
      throw new HttpException(
        'Departamento no encontrado',
        HttpStatus.NOT_FOUND,
      );
    }

    const selectedCity = selectedDepartment.ciudades.find(
      (ciudad) => ciudad === city_name,
    );

    if (!selectedCity) {
      throw new HttpException(
        'Ciudad no encontrada en el departamento especificado',
        HttpStatus.NOT_FOUND,
      );
    }

    return { department_name, city_name };
  }
}
