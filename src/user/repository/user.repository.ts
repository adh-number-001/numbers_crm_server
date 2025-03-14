import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma';

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async getUserByUsername(username: string) {
    const user = await this.prismaService.user.findFirst({
      where: { username },
    });

    return user;
  }

  async validateUsername(username: string) {
    const user = await this.prismaService.user.findFirst({
      where: { username },
    });

    if (user) {
      throw new ForbiddenException('이미 가입된 username 입니다');
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

  async validateUsernameGetHashPassword(username: string) {
    const user = await this.prismaService.user.findFirst({
      where: { username },
    });

    if (!user) {
      throw new ForbiddenException('존재하지 않는 username 입니다');
    }

    return user;
  }
}
