import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '@prisma';

@Injectable()
export class ContactGroupRepository {
  constructor(private readonly prismaService: PrismaService) {}

  getContactGroupListByUserId(userId: number) {
    return this.prismaService.contactGroup.findMany({
      where: { userId },
      include: { _count: { select: { contactGroupMapping: true } } },
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

  deleteContactGroupAndMapping(userId: number, contactGroupId: number) {
    return this.prismaService.contactGroup.delete({
      where: { id: contactGroupId, userId },
    });
  }

  updateContactGroup(
    userId: number,
    contactGroupId: number,
    name: string,
    color: string,
  ) {
    return this.prismaService.contactGroup.update({
      where: { id: contactGroupId, userId },
      data: { name, color },
    });
  }

  validateContactGroupIdListAndUserId(
    userId: number,
    contactGroupIdList: number[],
  ) {
    contactGroupIdList.map(async (item) => {
      const contactGroup = await this.prismaService.contactGroup.findFirst({
        where: { id: item, userId },
      });

      if (!contactGroup) {
        throw new NotFoundException('그룹을 찾을 수 없습니다.');
      }
    });
  }
}
