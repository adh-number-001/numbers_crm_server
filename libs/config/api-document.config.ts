import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export default function apiDocumentConfig<T extends INestApplication>(
  app: T,
  documentInfo: { title: string; description: string },
  siteTitle: string,
) {
  const { title, description } = documentInfo;

  const config = new DocumentBuilder()
    .setTitle(title)
    .setDescription(description)
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('documents', app, document, {
    swaggerOptions: {
      tagsSorter: 'alpha',
      operationsSorter: 'conventional',
    },
    customSiteTitle: siteTitle,
  });
}
