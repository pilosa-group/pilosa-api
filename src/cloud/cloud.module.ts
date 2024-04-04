import { Module } from '@nestjs/common';
import { MonitoringService } from './monitoring.service';
import { ClientsModule } from '../clients/clients.module';
import { ServerInstanceService } from './server-instance.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetricsModule } from '../metrics/metrics.module';
import { CloudProviderAccount } from './entities/cloud-provider-account';
import { ServerInstance } from './entities/service-instance.entity';
import { CloudProviderAccountService } from './cloud-provider-account.service';
import { ServersController } from './servers.controller';

@Module({
  controllers: [ServersController],
  providers: [
    MonitoringService,
    ServerInstanceService,
    CloudProviderAccountService,
  ],
  imports: [
    ClientsModule,
    MetricsModule,
    TypeOrmModule.forFeature([CloudProviderAccount, ServerInstance]),
  ],
})
export class CloudModule {}
