import { Module } from '@nestjs/common';

import { ContactCategoryRepository } from './repository/contact-category.repository';
import { ContactCategoryController } from './controller/contact-category.controller';
import { ContactCategoryService } from './service/contact-category.service';

@Module({
  imports: [],
  controllers: [ContactCategoryController],
  providers: [ContactCategoryRepository, ContactCategoryService],
  exports: [ContactCategoryRepository],
})
export class ContactCategoryModule {}
