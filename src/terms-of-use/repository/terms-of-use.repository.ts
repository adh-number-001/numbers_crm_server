import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma';

@Injectable()
export class TermsOfUseRepository {
  constructor(private readonly prismaService: PrismaService) {}

  getTermsOfUseList() {
    return this.prismaService.termsOfUse.findMany({
      where: { isDeleted: false },
      orderBy: { isRequire: 'desc', createdAt: 'asc' },
    });
  }

  async getRequireTermsOfUseIdList() {
    const termsOfUse = await this.prismaService.termsOfUse.findMany({
      where: { isDeleted: false, isRequire: true },
      orderBy: { isRequire: 'desc', createdAt: 'asc' },
    });

    return termsOfUse.map((item) => item.id);
  }
}
