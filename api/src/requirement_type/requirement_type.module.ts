import { Module } from '@nestjs/common';
import { RequirementTypeService } from './services/requirement_type.service';
import { RequirementTypeController } from './controllers/requirement_type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequirementType } from './entities/requirement_type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RequirementType])],
  controllers: [RequirementTypeController],
  providers: [RequirementTypeService],
  exports: [RequirementTypeService],
})
export class RequirementTypeModule {}
