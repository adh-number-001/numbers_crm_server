import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '@prisma';

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async getUserByLoginId(loginId: string) {
    const user = await this.prismaService.user.findFirst({
      where: { loginId, isDeleted: false },
    });

    return user;
  }

  async validateLoginId(loginId: string) {
    const user = await this.prismaService.user.findFirst({
      where: { loginId },
    });

    if (user) {
      throw new ForbiddenException('이미 가입된 LoginId 입니다');
    }
  }

  async validateLoginIdGetUser(loginId: string) {
    const user = await this.prismaService.user.findFirst({
      where: { loginId, isDeleted: false },
    });

    if (!user) {
      throw new ForbiddenException('존재하지 않는 Login Id 입니다');
    }

    return user;
  }

  async getLoginIdListByPhoneNumber(phoneNumber: string) {
    const loginIdList = await this.prismaService.user.findMany({
      select: { loginId: true },
      where: { isDeleted: false, userDevice: { some: { phoneNumber } } },
    });

    if (!loginIdList.length) {
      throw new NotFoundException('계정이 존재하지 않습니다.');
    }

    return { loginIdList };
  }
}
