import { ApiModule } from '@app/api';
import { CloudProviderAccount } from '@app/cloud/entities/cloud-provider-account.entity';
import { ServerInstance } from '@app/cloud/entities/server-instance.entity';
import { CloudMetricsModule } from '@app/cloud-metrics';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

import { CloudProviderAccountService } from './cloud-provider-account.service';
import { MonitoringService } from './monitoring.service';
import { ServerInstanceService } from './server-instance.service';
import { ServersController } from './servers.controller';

@Module({
  controllers: [ServersController],
  exports: [CloudProviderAccountService],
  imports: [
    CloudMetricsModule,
    ApiModule,
    MikroOrmModule.forFeature([CloudProviderAccount, ServerInstance]),
    ScheduleModule.forRoot(),
  ],
  providers: [
    MonitoringService,
    ServerInstanceService,
    CloudProviderAccountService,
  ],
})
export class CloudModule {}
