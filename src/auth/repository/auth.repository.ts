import { AuthEnum } from '@common/util/enum/auth-enum';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma';

@Injectable()
export class AuthRepository {
  constructor(private readonly prismaService: PrismaService) {}

  register(
    username: string,
    password: string,
    fullName: string,
    phoneNumber: string,
    birthDate?: bigint,
    gender?: AuthEnum.GenderType,
  ) {
    return this.prismaService.user.create({
      data: { username, password, fullName, phoneNumber, birthDate, gender },
    });
  }
}
