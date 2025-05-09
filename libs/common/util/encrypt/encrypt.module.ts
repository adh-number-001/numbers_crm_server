import { Global, Module } from '@nestjs/common';
import { EncryptionService } from './encrypt.service';

@Global()
@Module({
  providers: [EncryptionService],
  exports: [EncryptionService],
})
export class EncryptModule {}
