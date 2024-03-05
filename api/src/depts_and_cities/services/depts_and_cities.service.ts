import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class DeptsAndCitiesService {
  async getDepartmentsAndMunicipalities(): Promise<any[]> {
    try {
      const response = await axios.get(
        'https://raw.githubusercontent.com/marcovega/colombia-json/master/colombia.min.json',
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        'No se pudo obtener la información de ubicación de Colombia',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getCitiesByDepartment(departmentId: number): Promise<string[] | null> {
    const departments = await this.getDepartmentsAndMunicipalities();

    const selectedDepartment = departments.find(
      (dept) => dept.id === departmentId,
    );

    return selectedDepartment ? selectedDepartment.ciudades : null;
  }
}
