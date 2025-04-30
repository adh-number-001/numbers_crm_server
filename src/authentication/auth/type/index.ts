import { DeviceEnum } from '@common/util/enum/device-enum';

export type RegisterDeviceInfo = {
  deviceId: string;
  osType: DeviceEnum.OsType;
  phoneNumber: string;
};
