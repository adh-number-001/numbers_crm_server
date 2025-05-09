import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma';

import { ContactEnum } from '@common/util/enum/contact-enum';

@Injectable()
export class ContactEventRepository {
  constructor(private readonly prismaService: PrismaService) {}

  createContactEvent(
    contactId: number,
    eventDate: bigint,
    type: ContactEnum.ContactEventType,
    body: string,
  ) {
    return this.prismaService.contactEvent.create({
      data: { contactId, eventDate, type, body },
    });
  }
}
