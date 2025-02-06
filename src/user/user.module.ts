import { Module } from '@nestjs/common';

import { UserRepository } from './repository/user.repository';

@Module({
  imports: [],
  controllers: [],
  providers: [UserRepository],
  exports: [UserRepository],
})
export class UserModule {}
