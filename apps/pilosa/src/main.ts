import { ValidationPipe, VersioningType } from '@nestjs/common';
import {
  BaseExceptionFilter,
  HttpAdapterHost,
  NestFactory,
} from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as Sentry from '@sentry/node';

import { AppModule } from './app.module';
import { ENV_DEVELOPMENT } from './config/configuration';
import './instrument';
import { initSentry } from './instrument';

async function bootstrap() {
  const debugMode = process.env.NODE_ENV === ENV_DEVELOPMENT;

  process.env.SENTRY_DSN &&
    initSentry({
      dsn: process.env.SENTRY_DSN,
      tracesSampleRate: Number(process.env.SENTRY_TRACES_SAMPLE_RATE),
    });

  const app = await NestFactory.create(AppModule);

  const { httpAdapter } = app.get(HttpAdapterHost);
  Sentry.setupNestErrorHandler(app, new BaseExceptionFilter(httpAdapter));

  app.enableVersioning({
    defaultVersion: '1',
    prefix: 'v',
    type: VersioningType.URI,
  });

  app.enableCors({
    origin: '*',
  });

  app.getHttpAdapter().getInstance().set('trust proxy', true);
  app.getHttpAdapter().getInstance().disable('x-powered-by');

  const config = new DocumentBuilder()
    .setTitle('Pilosa')
    .setDescription('Pilosa API')
    .addServer(process.env.API_BASE_URL)
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      enableDebugMessages: debugMode,
      forbidNonWhitelisted: debugMode,
      transform: true,
      validateCustomDecorators: true,
      whitelist: true,
    }),
  );

  await app.listen(4000);
}

void bootstrap();
