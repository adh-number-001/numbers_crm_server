import { Injectable } from '@nestjs/common';

import { ContactCategoryRepository } from '../repository/contact-category.repository';

@Injectable()
export class ContactCategoryService {
  constructor(
    private readonly contactCategoryRepository: ContactCategoryRepository,
  ) {}

  async getContactCategoryListByUserId(userId: number) {
    const contactCategoryList =
      await this.contactCategoryRepository.getContactCategoryListByUserId(
        userId,
      );

    return contactCategoryList;
  }
}
