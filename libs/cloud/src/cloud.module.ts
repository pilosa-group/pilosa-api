import { Module } from '@nestjs/common';
import { MonitoringService } from './monitoring.service';
import { ServerInstanceService } from './server-instance.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CloudProviderAccountService } from './cloud-provider-account.service';
import { ServersController } from './servers.controller';
import { ClientModule } from '@app/client';
import { CloudMetricsModule } from '@app/cloud-metrics';
import { CloudProviderAccount } from '@app/cloud/entities/cloud-provider-account.entity';
import { ServerInstance } from '@app/cloud/entities/service-instance.entity';

@Module({
  controllers: [ServersController],
  providers: [
    MonitoringService,
    ServerInstanceService,
    CloudProviderAccountService,
  ],
  imports: [
    ClientModule,
    CloudMetricsModule,
    TypeOrmModule.forFeature([CloudProviderAccount, ServerInstance]),
  ],
})
export class CloudModule {}
