import { Module } from '@nestjs/common';
import { MedicalReqService } from './services/medical_req.service';
import { MedicalReqController } from './controllers/medical_req.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicalReq } from './entities/medical_req.entity';
import { User } from '../users/entities/user.entity';
import { UsersModule } from '../users/users.module';
import { NodemailerModule } from '../nodemailer/nodemailer.module';
import { UserRole } from '../user_roles/entities/user_role.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([MedicalReq, User, UserRole]),
    UsersModule,
    NodemailerModule,
  ],
  providers: [MedicalReqService],
  controllers: [MedicalReqController],
})
export class MedicalReqModule {}
