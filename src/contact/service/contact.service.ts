import { Injectable, NotFoundException } from '@nestjs/common';

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

  async getContactDetail(userId: number, contactId: number) {
    await this.contactRepository.validateContactId(contactId);
    await this.contactRepository.validateUserIdAndContactId(userId, contactId);

    const contactDetail = await this.contactRepository.getContactDetail(
      userId,
      contactId,
    );
    if (!contactDetail) {
      throw new NotFoundException('존재하지 않는 연락처입니다.');
    }

    return { contactDetail };
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
