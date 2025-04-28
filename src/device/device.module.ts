import { Module } from '@nestjs/common';

import { DeviceRepository } from './repository/device.repository';

@Module({
  imports: [],
  controllers: [],
  providers: [DeviceRepository],
  exports: [DeviceRepository],
})
export class DeviceModule {}
