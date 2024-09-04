import { Module } from '@nestjs/common';
import { ReasonsForRejectionService } from './services/reasons_for_rejection.service';
import { ReasonsForRejectionController } from './controllers/reasons_for_rejection.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReasonsForRejection } from './entities/reasons_for_rejection.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReasonsForRejection])],
  controllers: [ReasonsForRejectionController],
  providers: [ReasonsForRejectionService],
})
export class ReasonsForRejectionModule {}
