import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

import apiDocumentConfig from '@config/api-document.config';
import corsConfig from '@config/cors.config';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.use(cookieParser());

  corsConfig(app);

  const env = process.env.NODE_ENV;
  // if (env !== 'prod') {
  //   apiDocumentConfig(app, { title: '넘버거래소 CRM', description: '넘버거래소 CRM API 문서 입니다.' });
  // }
  apiDocumentConfig(app, { title: '넘버거래소 CRM', description: '넘버거래소 CRM API 문서 입니다.' });

  await app.listen(3000);
}
bootstrap();
