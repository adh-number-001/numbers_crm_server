import { Injectable } from '@nestjs/common';

import { ContactGroupRepository } from '../repository/contact-group.repository';
import { UpdateContactGroup } from '../type';

@Injectable()
export class ContactGroupService {
  constructor(
    private readonly contactGroupRepository: ContactGroupRepository,
  ) {}

  async getContactGroupListByUserId(userId: number) {
    const contactGroupList =
      await this.contactGroupRepository.getContactGroupListByUserId(userId);

    return contactGroupList;
  }

  async updateContactGroupList(
    userId: number,
    contactGroupList: UpdateContactGroup[],
  ) {
    await Promise.all(
      contactGroupList.map((group) => {
        const { contactGroupId, name, color } = group;

        if (contactGroupId && !name && !color) {
          return this.contactGroupRepository.deleteContactGroupAndMapping(
            userId,
            contactGroupId,
          );
        }

        if (contactGroupId && name && color) {
          return this.contactGroupRepository.updateContactGroup(
            userId,
            contactGroupId,
            name,
            color,
          );
        }

        if (!contactGroupId && name && color) {
          return this.contactGroupRepository.createContactGroup(
            userId,
            name,
            color,
          );
        }

        return Promise.resolve();
      }),
    );
  }
}
