import { Module } from '@nestjs/common';

import { AuthRepository } from './repository/auth.repository';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [AuthRepository, AuthService],
  exports: [AuthRepository],
})
export class AuthModule {}
