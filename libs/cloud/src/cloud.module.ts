import { Module } from '@nestjs/common';
import { MonitoringService } from './monitoring.service';
import { ServerInstanceService } from './server-instance.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudProviderAccountService } from './cloud-provider-account.service';
import { ServersController } from './servers.controller';
import { CloudMetricsModule } from '@app/cloud-metrics';
import { CloudProviderAccount } from '@app/cloud/entities/cloud-provider-account.entity';
import { ServerInstance } from '@app/cloud/entities/service-instance.entity';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  controllers: [ServersController],
  providers: [
    MonitoringService,
    ServerInstanceService,
    CloudProviderAccountService,
  ],
  imports: [
    CloudMetricsModule,
    TypeOrmModule.forFeature([CloudProviderAccount, ServerInstance]),
    ScheduleModule.forRoot(),
  ],
  exports: [CloudProviderAccountService],
})
export class CloudModule {}
