import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '@prisma';

@Injectable()
export class UserDeviceRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async validatePhoneNumber(phoneNumber: string) {
    const device = await this.prismaService.userDevice.findFirst({
      where: { phoneNumber },
    });

    if (device) {
      throw new ForbiddenException('이미 가입된 전화번호 입니다');
    }
  }

  async getUserDeviceIdByUserIdAndDeviceIdAndPhoneNumber(
    userId: number,
    deviceId: string,
    phoneNumber: string,
  ) {
    const userDevice = await this.prismaService.userDevice.findFirst({
      where: { userId, deviceId, phoneNumber, isDeleted: false },
    });

    // 동일한 핸드폰이면서 다른 전화번호로 로그인 한 경우 -> 본인인증
    // 다른 핸드폰인데 동일한 전화번호로 로그인 한 경우 -> 본인인증
    // 둘 다 일치하는 데이터가 있는 경우 pass

    if (!userDevice) {
      throw new ForbiddenException('인증되지 않은 device 입니다.');
    }

    return { userDeviceId: userDevice.id };
  }

  updateRefreshToken(userDeviceId: number, refreshToken: string) {
    return this.prismaService.userDevice.update({
      where: { id: userDeviceId, isDeleted: false },
      data: { refreshToken },
    });
  }
}
