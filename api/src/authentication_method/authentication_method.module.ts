import { Module } from '@nestjs/common';
import { AuthenticationMethodService } from './services/authentication_method.service';
import { AuthenticationMethodController } from './controllers/authentication_method.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthenticationMethod } from './entities/authentication_method.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AuthenticationMethod])],
  controllers: [AuthenticationMethodController],
  providers: [AuthenticationMethodService],
})
export class AuthenticationMethodModule {}
