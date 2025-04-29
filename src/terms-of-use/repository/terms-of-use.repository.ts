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
}
