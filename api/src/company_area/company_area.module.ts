import { Module } from '@nestjs/common';
import { CompanyAreaService } from './services/company_area.service';
import { CompanyAreaController } from './controllers/company_area.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyArea } from './entities/company_area.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyArea])],
  controllers: [CompanyAreaController],
  providers: [CompanyAreaService],
})
export class CompanyAreaModule {}
