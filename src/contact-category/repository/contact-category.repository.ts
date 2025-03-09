import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma';

@Injectable()
export class ContactCategoryRepository {
  constructor(private readonly prismaService: PrismaService) {}

  getContactCategoryListByUserId(userId: number) {
    return this.prismaService.contactCategory.findMany({
      where: { userId },
    });
  }

  createContactCategory(userId: number, contactCategoryName: string) {
    return this.prismaService.contactCategory.create({
      data: { userId, name: contactCategoryName },
    });
  }

  async validateContactCategoryByUserIdAndName(
    userId: number,
    contactCategoryName: string,
  ) {
    const contactCategory = await this.prismaService.contactCategory.findFirst({
      where: { userId, name: contactCategoryName },
    });

    if (contactCategory) {
      throw new ForbiddenException('이미 존재하는 그룹명입니다');
    }
  }
}
