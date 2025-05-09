import { Module } from '@nestjs/common';

import { ContactEventRepository } from './repository/contact-event.repository';
import { ContactEventController } from './controller/contact-event.controller';
import { ContactEventService } from './service/contact-event.service';
import { ContactModule } from '../contact/contact.module';

@Module({
  imports: [ContactModule],
  controllers: [ContactEventController],
  providers: [ContactEventRepository, ContactEventService],
  exports: [ContactEventRepository],
})
export class ContactEventModule {}
