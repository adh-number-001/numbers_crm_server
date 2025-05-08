import { Module } from '@nestjs/common';

import { EncryptModule } from '@common/util/encrypt/encrypt.module';

import { ContactRepository } from './repository/contact.repository';
import { ContactController } from './controller/contact.controller';
import { ContactService } from './service/contact.service';
import { ContactGroupModule } from '../contact-group/contact-group.module';

@Module({
  imports: [ContactGroupModule, EncryptModule],
  controllers: [ContactController],
  providers: [ContactRepository, ContactService],
  exports: [ContactRepository],
})
export class ContactModule {}
