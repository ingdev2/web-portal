import { Module } from '@nestjs/common';
import { GenderTypeService } from './services/genders.service';
import { GenderTypeController } from './controllers/genders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenderType } from './entities/gender.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GenderType])],
  controllers: [GenderTypeController],
  providers: [GenderTypeService],
})
export class GenderTypeModule {}
