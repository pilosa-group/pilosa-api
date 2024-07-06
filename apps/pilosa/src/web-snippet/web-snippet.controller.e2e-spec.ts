import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { WebSnippetController } from './web-snippet.controller';

describe('WebSnippetController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [WebSnippetController],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET sloth.js', () => {
    return request(app.getHttpServer())
      .get('/sloth.js')
      .expect(200)
      .expect('Content-Type', 'text/javascript; charset=utf-8')
      .expect('Cache-Control', 'public, max-age=60')
      .expect('Timing-Allow-Origin', '*');
  });

  afterEach(async () => {
    await app.close();
  });
});
