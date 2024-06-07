import { Module } from '@nestjs/common';
import { SyntheticScanService } from './synthetic-scan.service';
import { SyntheticScanController } from '@app/synthetic-scan/synthetic-scan.controller';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports:[
    CacheModule.register()],
  controllers: [SyntheticScanController],
  providers: [SyntheticScanService],
  exports: [SyntheticScanService],
})
export class SyntheticScanModule {}
