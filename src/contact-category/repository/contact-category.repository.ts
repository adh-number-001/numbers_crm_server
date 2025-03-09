import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma';

@Injectable()
export class ContactCategoryRepository {
  constructor(private readonly prismaService: PrismaService) {}

  getContactCategoryListByUserId(userId: number) {
    return this.prismaService.contactCategory.findMany({
      where: { userId },
    });
  }
}
