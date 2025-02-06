import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma';

@Injectable()
export class AuthRepository {
  constructor(private readonly prismaService: PrismaService) {}

  register(email: string, password: string, name: string, phoneNumber: string) {
    return this.prismaService.user.create({
      data: { email, password, name, phoneNumber },
    });
  }
}
