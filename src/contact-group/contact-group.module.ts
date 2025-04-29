import { Module } from '@nestjs/common';

import { ContactGroupRepository } from './repository/contact-group.repository';
import { ContactGroupController } from './controller/contact-group.controller';
import { ContactGroupService } from './service/contact-group.service';

@Module({
  imports: [],
  controllers: [ContactGroupController],
  providers: [ContactGroupRepository, ContactGroupService],
  exports: [ContactGroupRepository],
})
export class ContactGroupModule {}
