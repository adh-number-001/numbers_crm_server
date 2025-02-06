import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma';

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async validateEmail(email: string) {
    const user = await this.prismaService.user.findFirst({
      where: { email },
    });

    if (user) {
      throw new ForbiddenException('이미 가입된 email 입니다');
    }
  }

  async validatePhoneNumber(phoneNumber: string) {
    const user = await this.prismaService.user.findFirst({
      where: { phoneNumber },
    });

    if (user) {
      throw new ForbiddenException('이미 가입된 전화번호 입니다');
    }
  }
}
