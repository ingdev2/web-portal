import { Module } from '@nestjs/common';
import { PositionLevelService } from './services/position_level.service';
import { PositionLevelController } from './controllers/position_level.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PositionLevel } from './entities/position_level.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PositionLevel])],
  controllers: [PositionLevelController],
  providers: [PositionLevelService],
})
export class PositionLevelModule {}
