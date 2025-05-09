import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma';

@Injectable()
export class ContactNoteRepository {
  constructor(private readonly prismaService: PrismaService) {}

  getContactNote(userId: number, contactId: number) {
    return this.prismaService.contactNote.findFirst({
      where: { contactId, contact: { userId } },
    });
  }
}
