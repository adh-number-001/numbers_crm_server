import { Module } from '@nestjs/common';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';

import { AllExceptionFilter } from '@config/filter/all-exception.filter';
import validationPipeConfig from '@config/pipe/validation-pipe.config';
import { PrismaModule } from '@prisma';

import { HealthModule } from './health/health.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ContactModule } from './contact/contact.module';
import { ContactCategoryModule } from './contact-category/contact-category.module';

const domainModules = [
  AuthModule,
  UserModule,
  ContactModule,
  ContactCategoryModule,
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
