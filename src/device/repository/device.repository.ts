import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '@prisma';

@Injectable()
export class DeviceRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async validatePhoneNumber(phoneNumber: string) {
    const device = await this.prismaService.device.findFirst({
      where: { phoneNumber },
    });

    if (device) {
      throw new ForbiddenException('이미 가입된 전화번호 입니다');
    }
  }
}
