import { Module } from '@nestjs/common';

import { UserTermsOfUseController } from './controller/user-terms-of-use.controller';
import { UserTermsOfUseRepository } from './repository/user-terms-of-use.repository';
import { UserTermsOfUseService } from './service/user-terms-of-use.service';
import { TermsOfUseModule } from '../terms-of-use/terms-of-use.module';

@Module({
  imports: [TermsOfUseModule],
  controllers: [UserTermsOfUseController],
  providers: [UserTermsOfUseRepository, UserTermsOfUseService],
  exports: [UserTermsOfUseRepository],
})
export class UserTermsOfUseModule {}
