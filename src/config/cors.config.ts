import { INestApplication } from '@nestjs/common';

export default function corsConfig<T extends INestApplication>(app: T) {
  const origin = ['http://localhost:3000'];

  app.enableCors({
    origin,
    credentials: true,
  });
}
