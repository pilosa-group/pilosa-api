import { Module } from '@nestjs/common';
import { MonitoringService } from './monitoring.service';

@Module({
  providers: [MonitoringService],
})
export class CloudModule {}
