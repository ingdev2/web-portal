import { Module } from '@nestjs/common';
import { RequirementStatusService } from './services/requirement_status.service';
import { RequirementStatusController } from './controllers/requirement_status.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequirementStatus } from './entities/requirement_status.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RequirementStatus])],
  controllers: [RequirementStatusController],
  providers: [RequirementStatusService],
  exports: [RequirementStatusService],
})
export class RequirementStatusModule {}
