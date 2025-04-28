import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma';

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async getUserByUsername(loginId: string) {
    const user = await this.prismaService.user.findFirst({
      where: { loginId },
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

  async validateUsernameGetHashPassword(loginId: string) {
    const user = await this.prismaService.user.findFirst({
      where: { loginId },
    });

    if (!user) {
      throw new ForbiddenException('존재하지 않는 LoginId 입니다');
    }

    return user;
  }
}
