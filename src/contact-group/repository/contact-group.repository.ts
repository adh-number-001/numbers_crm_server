import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma';

@Injectable()
export class ContactGroupRepository {
  constructor(private readonly prismaService: PrismaService) {}

  getContactGroupListByUserId(userId: number) {
    return this.prismaService.contactGroup.findMany({
      where: { userId },
      orderBy: { createdAt: 'asc' },
    });
  }

  createContactGroup(userId: number, name: string, color: string) {
    return this.prismaService.contactGroup.create({
      data: { userId, name, color },
    });
  }

  async validateContactGroupByUserIdAndName(userId: number, name: string) {
    const contactGroup = await this.prismaService.contactGroup.findFirst({
      where: { userId, name },
    });

    if (contactGroup) {
      throw new ForbiddenException('이미 존재하는 그룹명입니다');
    }
  }
}
