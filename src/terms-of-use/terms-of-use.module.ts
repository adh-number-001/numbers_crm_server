import { Module } from '@nestjs/common';

import { TermsOfUseController } from './controller/terms-of-use.controller';
import { TermsOfUseRepository } from './repository/terms-of-use.repository';
import { TermsOfUseService } from './service/terms-of-use.service';

@Module({
  imports: [],
  controllers: [TermsOfUseController],
  providers: [TermsOfUseRepository, TermsOfUseService],
  exports: [TermsOfUseRepository],
})
export class TermsOfUseModule {}
