import { Module } from '@nestjs/common';
import { WebSnippetController } from './web-snippet.controller';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [CacheModule.register()],
  controllers: [WebSnippetController],
})
export class WebSnippetModule {}
