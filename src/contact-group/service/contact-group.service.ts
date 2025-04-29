import { Injectable } from '@nestjs/common';

import { ContactGroupRepository } from '../repository/contact-group.repository';

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

  async createContactGroup(userId: number, name: string, color: string) {
    await this.contactGroupRepository.validateContactGroupByUserIdAndName(
      userId,
      name,
    );

    const contactGroup = await this.contactGroupRepository.createContactGroup(
      userId,
      name,
      color,
    );

    return { contactGroupId: contactGroup.id };
  }
}
