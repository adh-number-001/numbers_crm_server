import { Module } from '@nestjs/common';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';

import { AllExceptionFilter } from '@config/filter/all-exception.filter';
import validationPipeConfig from '@config/pipe/validation-pipe.config';
import { PrismaModule } from '@prisma';

import { HealthModule } from './health/health.module';
import { UserModule } from './user/user.module';
import { ContactModule } from './contact/contact.module';
import { ContactGroupModule } from './contact-group/contact-group.module';
import { UserDeviceModule } from './user-device/user-device.module';
import { TermsOfUseModule } from './terms-of-use/terms-of-use.module';
import { UserTermsOfUseModule } from './user-terms-of-use/user-terms-of-use.module';
import { AuthModule } from './authentication/auth/auth.module';
import { ContactNoteModule } from './contact-note/contact-note.module';
import { ContactEventModule } from './contact-event/contact-event.module';

const domainModules = [
  AuthModule,
  UserModule,
  ContactModule,
  ContactGroupModule,
  UserDeviceModule,
  TermsOfUseModule,
  UserTermsOfUseModule,
  ContactNoteModule,
  ContactEventModule,
];

@Module({
  imports: [
    ...domainModules,
    PrismaModule,
    HealthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`environment/.${process.env.NODE_ENV}.env`],
    }),
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
    {
      provide: APP_PIPE,
      useValue: validationPipeConfig(),
    },
  ],
})
export class AppModule {}
