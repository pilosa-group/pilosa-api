import './instrument';

import * as Sentry from '@sentry/node';
import {
  BaseExceptionFilter,
  HttpAdapterHost,
  NestFactory,
} from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { initSentry } from './instrument';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ENV_DEVELOPMENT } from './config/configuration';

async function bootstrap() {
  process.env.SENTRY_DSN &&
    initSentry({
      dsn: process.env.SENTRY_DSN,
      tracesSampleRate: Number(process.env.SENTRY_TRACES_SAMPLE_RATE),
    });

  const app = await NestFactory.create(AppModule);

  const { httpAdapter } = app.get(HttpAdapterHost);
  Sentry.setupNestErrorHandler(app, new BaseExceptionFilter(httpAdapter));

  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'v',
    defaultVersion: '1',
  });

  app.enableCors({
    origin: '*',
  });

  app.getHttpAdapter().getInstance().set('trust proxy', true);
  app.getHttpAdapter().getInstance().disable('x-powered-by');

  if (process.env.NODE_ENV === ENV_DEVELOPMENT) {
    const config = new DocumentBuilder()
      .setTitle('Pilosa')
      .setDescription('Pilosa API description')
      .setVersion('1.0')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
  }

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen(4000);
}

void bootstrap();
