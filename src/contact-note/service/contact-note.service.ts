import { Injectable } from '@nestjs/common';

import { ContactNoteRepository } from '../repository/contact-note.repository';
import { ContactRepository } from '../../contact/repository/contact.repository';

@Injectable()
export class ContactNoteService {
  constructor(
    private readonly contactNoteRepository: ContactNoteRepository,
    private readonly contactRepository: ContactRepository,
  ) {}

  async getContactNote(userId: number, contactId: number) {
    await this.contactRepository.validateContactId(contactId);
    await this.contactRepository.validateUserIdAndContactId(userId, contactId);

    return this.contactNoteRepository.getContactNote(userId, contactId);
  }
}
