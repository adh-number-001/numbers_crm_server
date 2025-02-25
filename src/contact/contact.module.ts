import { Module } from '@nestjs/common';

import { ContactRepository } from './repository/contact.repository';
import { ContactController } from './controller/contact.controller';
import { ContactService } from './service/contact.service';

@Module({
  imports: [],
  controllers: [ContactController],
  providers: [ContactRepository, ContactService],
  exports: [ContactRepository],
})
export class ContactModule {}
