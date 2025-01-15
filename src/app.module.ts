import { Module } from '@nestjs/common';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';

import { AllExceptionFilter } from '@config/filter/all-exception.filter';
import { PrismaModule } from '@lib/prisma/prisma.module';
import validationPipeConfig from '@config/pipe/validation-pipe.config';

import { HealthModule } from './health/health.module';

@Module({
  imports: [
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
