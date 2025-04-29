import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma';

@Injectable()
export class UserTermsOfUseRepository {
  constructor(private readonly prismaService: PrismaService) {}

  createUserTermsOfUseList(userId: number, termsOfUseIdList: number[]) {
    return this.prismaService.userTermsOfUse.createMany({
      data: termsOfUseIdList.map((termsOfUseId) => ({ userId, termsOfUseId })),
    });
  }
}
