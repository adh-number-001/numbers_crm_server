import { AuthEnum } from '@common/util/enum/auth-enum';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma';
import { RegisterDeviceInfo } from '../type';

@Injectable()
export class AuthRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async register(
    loginId: string,
    password: string,
    fullName: string,
    deviceInfo: RegisterDeviceInfo,
    birthDate: bigint,
    gender: AuthEnum.GenderType,
  ) {
    const { deviceId, osType, phoneNumber } = deviceInfo;

    const { id } = await this.prismaService.user.create({
      data: { loginId, password, fullName, birthDate, gender },
    });

    await this.prismaService.userDevice.create({
      data: { userId: id, deviceId, osType, phoneNumber },
    });

    return { id };
  }
}
