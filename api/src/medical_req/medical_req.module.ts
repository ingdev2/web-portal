import { Module } from '@nestjs/common';
import { MedicalReqService } from './services/medical_req.service';
import { MedicalReqController } from './controllers/medical_req.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicalReq } from './entities/medical_req.entity';
import { User } from 'src/users/entities/user.entity';
import { UsersModule } from 'src/users/users.module';
import { NodemailerModule } from 'src/nodemailer/nodemailer.module';
import { UserRolesModule } from 'src/user_roles/user_roles.module';
import { UserRole } from 'src/user_roles/entities/user_role.entity';

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
