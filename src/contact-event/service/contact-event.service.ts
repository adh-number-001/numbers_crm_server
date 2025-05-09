import { Injectable } from '@nestjs/common';

import { ContactEnum } from '@common/util/enum/contact-enum';

import { ContactEventRepository } from '../repository/contact-event.repository';
import { ContactRepository } from '../../contact/repository/contact.repository';

@Injectable()
export class ContactEventService {
  constructor(
    private readonly contactEventRepository: ContactEventRepository,
    private readonly contactRepository: ContactRepository,
  ) {}

  async createContactEvent(
    userId: number,
    contactId: number,
    eventDate: bigint,
    type: ContactEnum.ContactEventType,
    body: string,
  ) {
    await this.contactRepository.validateContactId(contactId);
    await this.contactRepository.validateUserIdAndContactId(userId, contactId);

    return this.contactEventRepository.createContactEvent(
      contactId,
      eventDate,
      type,
      body,
    );
  }
}
