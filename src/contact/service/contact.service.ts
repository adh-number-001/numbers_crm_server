import { Injectable } from '@nestjs/common';

import { ContactRepository } from '../repository/contact.repository';
import { ContactGroupRepository } from '../../contact-group/repository/contact-group.repository';

@Injectable()
export class ContactService {
  constructor(
    private readonly contactRepository: ContactRepository,
    private readonly contactGroupRepository: ContactGroupRepository,
  ) {}

  async createContact(
    userId: number,
    name: string,
    phoneNumber: string,
    subContactList: string[],
    contactGroupIdList: number[],
    addressList: string[],
    vehicleList: string[],
    carNumberList: string[],
  ) {
    this.contactGroupRepository.validateContactGroupIdListAndUserId(
      userId,
      contactGroupIdList,
    );

    await this.contactRepository.createContact(
      userId,
      name,
      phoneNumber,
      subContactList,
      contactGroupIdList,
      addressList,
      vehicleList,
      carNumberList,
    );
  }

  //   async getContactListByOption(
  //     page: number,
  //     pageSize: number,
  //     userId: number,
  //     contactCategoryId?: number,
  //     searchText?: string,
  //   ) {
  //     const { contactList, totalCount } =
  //       await this.contactRepository.getContactListByOption(
  //         page,
  //         pageSize,
  //         userId,
  //         contactCategoryId,
  //         searchText,
  //       );

  //     return { contactList, totalCount };
  //   }

  //   async checkAndStoreNewContactList(
  //     userId: number,
  //     contactCategoryId: number,
  //     contactList: UpdateContact[],
  //   ) {
  //     const uuid = uuidV4();
  //     const { count } = await this.contactRepository.checkAndStoreNewContactList(
  //       userId,
  //       contactCategoryId,
  //       contactList,
  //       uuid,
  //     );

  //     return { count, uuid };
  //   }

  //   createContactListByTempContact(userId: number, uuid: string) {
  //     return this.contactRepository.createContactListByTempContact(userId, uuid);
  //   }
}
