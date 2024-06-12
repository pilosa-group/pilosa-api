import './instrument';

import * as Sentry from '@sentry/node';
import {
  BaseExceptionFilter,
  HttpAdapterHost,
  NestFactory,
} from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import { initSentry } from './instrument';

async function bootstrap() {
  process.env.SENTRY_DSN &&
    initSentry({
      dsn: process.env.SENTRY_DSN,
      tracesSampleRate: Number(process.env.SENTRY_TRACES_SAMPLE_RATE),
    });

  const app = await NestFactory.create(AppModule);

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

  const { httpAdapter } = app.get(HttpAdapterHost);
  Sentry.setupNestErrorHandler(app, new BaseExceptionFilter(httpAdapter));

  await app.listen(4000);
}

void bootstrap();
