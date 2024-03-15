import { Module } from '@nestjs/common';
import { MonitoringService } from './monitoring.service';
import { ClientsModule } from '../clients/clients.module';
import { CloudImportService } from './cloud-import.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudImport } from './entities/cloud-import';
import { MetricsModule } from '../metrics/metrics.module';

@Module({
  providers: [MonitoringService, CloudImportService],
  imports: [
    ClientsModule,
    MetricsModule,
    TypeOrmModule.forFeature([CloudImport]),
  ],
})
export class CloudModule {}
