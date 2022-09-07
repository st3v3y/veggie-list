import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import * as compression from 'compression';
import { VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  app.enableCors();
  app.use(helmet());
  app.use(compression());

  app.enableVersioning({
    defaultVersion: '1',
    type: VersioningType.URI,
  });

  const port = configService.get('PORT');

  console.log('Listening to http://localhost:' + port);

  await app.listen(port);
}
bootstrap();
