import { Module } from '@nestjs/common';
import { AuthorizedFamiliarService } from './services/authorized_familiar.service';
import { AuthorizedFamiliarController } from './controllers/authorized_familiar.controller';

@Module({
  controllers: [AuthorizedFamiliarController],
  providers: [AuthorizedFamiliarService],
})
export class AuthorizedFamiliarModule {}
