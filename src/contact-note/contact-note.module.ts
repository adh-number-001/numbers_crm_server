import { Module } from '@nestjs/common';

import { ContactNoteRepository } from './repository/contact-note.repository';
import { ContactNoteController } from './controller/contact-note.controller';
import { ContactNoteService } from './service/contact-note.service';
import { ContactModule } from '../contact/contact.module';

@Module({
  imports: [ContactModule],
  controllers: [ContactNoteController],
  providers: [ContactNoteRepository, ContactNoteService],
  exports: [ContactNoteRepository],
})
export class ContactNoteModule {}
