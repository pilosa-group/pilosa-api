import { Injectable } from '@nestjs/common';
import { ServerInstanceService } from './server-instance.service';
import { AwsCredentials } from './cloud-provider-instance-list.interface';
import { CloudProviderAccountService } from './cloud-provider-account.service';
import { AwsGetMetrics } from '@app/cloud-aws/aws-get-metrics';
import { AwsInstanceList } from '@app/cloud-aws/aws-instance-list';
import { ServerMetricService } from '@app/cloud-metrics/server-metric.service';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

@Injectable()
export class MonitoringService {
  constructor(
    private readonly serverInstanceService: ServerInstanceService,
    private readonly cloudProviderAccountService: CloudProviderAccountService,
    private readonly serverMetricService: ServerMetricService,
  ) {
    void this.run();
  }

  async run() {
    const cloudProviderAccount =
      await this.cloudProviderAccountService.findOneLatestImported();

    if (cloudProviderAccount) {
      console.log('importing metrics for account', cloudProviderAccount.id);

      const awsCredentials: AwsCredentials = {
        accessKeyId: cloudProviderAccount.accessKeyId,
        secretAccessKey: cloudProviderAccount.secretAccessKey,
        region: cloudProviderAccount.region,
      };

      if (awsCredentials) {
        const instanceList = new AwsInstanceList();
        const instances = await instanceList.listInstances(awsCredentials);

        for (const instance of instances) {
          const endTime = new Date();
          const startTime = new Date(endTime);
          startTime.setHours(startTime.getHours() - 2);

          const serverInstance =
            await this.serverInstanceService.findOrCreateOneByInstanceId(
              instance,
              cloudProviderAccount,
            );

          const lastImportedAt =
            await this.serverMetricService.getLastImportedDate(serverInstance);

          const metrics = new AwsGetMetrics();
          const instanceMetrics = await metrics.getMetrics(
            awsCredentials,
            instance,
            {
              startTime,
              endTime,
            },
          );

          for (const metric of instanceMetrics) {
            if (metric.datetime > lastImportedAt) {
              const serverMetric = await this.serverMetricService.create(
                metric,
                serverInstance,
              );

              await this.serverMetricService.save(serverMetric);
            }
          }
        }
      }

      cloudProviderAccount.lastImportedAt = new Date();
      await this.cloudProviderAccountService.save(cloudProviderAccount);
    }

    await sleep(5000);
    await this.run();
  }
}