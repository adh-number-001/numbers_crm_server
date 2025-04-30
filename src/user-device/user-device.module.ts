import { Module } from '@nestjs/common';

import { UserDeviceRepository } from './repository/user-device.repository';

@Module({
  imports: [],
  controllers: [],
  providers: [UserDeviceRepository],
  exports: [UserDeviceRepository],
})
export class UserDeviceModule {}
