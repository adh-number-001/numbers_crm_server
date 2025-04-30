import { Module } from '@nestjs/common';

import { AuthRepository } from './repository/auth.repository';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';
import { TokenModule } from '../token/token.module';
import { UserModule } from '../../user/user.module';
import { UserDeviceModule } from '../../user-device/user-device.module';

@Module({
  imports: [UserModule, TokenModule, UserDeviceModule],
  controllers: [AuthController],
  providers: [AuthRepository, AuthService],
  exports: [AuthRepository],
})
export class AuthModule {}
