import { Injectable } from '@nestjs/common';

import { ContactRepository } from '../repository/contact.repository';

@Injectable()
export class ContactService {
  constructor(private readonly contactRepository: ContactRepository) {}

  async getContactListByOption(
    page: number,
    pageSize: number,
    contactCategoryId?: number,
    searchText?: string,
  ) {
    const { contactList, totalCount } =
      await this.contactRepository.getContactListByOption(
        page,
        pageSize,
        contactCategoryId,
        searchText,
      );

    return { contactList, totalCount };
  }
}
