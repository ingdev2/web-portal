import { Module } from '@nestjs/common';
import { DeptsAndCitiesService } from './services/depts_and_cities.service';
import { DeptsAndCitiesController } from './controllers/depts_and_cities.controller';

@Module({
  controllers: [DeptsAndCitiesController],
  providers: [DeptsAndCitiesService],
  exports: [DeptsAndCitiesService],
})
export class DeptsAndCitiesModule {}
