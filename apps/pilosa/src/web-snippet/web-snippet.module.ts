import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';

import { WebSnippetController } from './web-snippet.controller';

@Module({
  controllers: [WebSnippetController],
  imports: [CacheModule.register()],
})
export class WebSnippetModule {}
