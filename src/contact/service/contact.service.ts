import { Injectable } from '@nestjs/common';
import { v4 as uuidV4 } from 'uuid';

import { ContactRepository } from '../repository/contact.repository';
import { UpdateContact } from '../type';

@Injectable()
export class ContactService {
  constructor(private readonly contactRepository: ContactRepository) {}

  async getContactListByOption(
    page: number,
    pageSize: number,
    userId: number,
    contactCategoryId?: number,
    searchText?: string,
  ) {
    const { contactList, totalCount } =
      await this.contactRepository.getContactListByOption(
        page,
        pageSize,
        userId,
        contactCategoryId,
        searchText,
      );

    return { contactList, totalCount };
  }

  async checkAndStoreNewContactList(
    userId: number,
    contactCategoryId: number,
    contactList: UpdateContact[],
  ) {
    const uuid = uuidV4();
    const { count } = await this.contactRepository.checkAndStoreNewContactList(
      userId,
      contactCategoryId,
      contactList,
      uuid,
    );

    return { count, uuid };
  }
}
