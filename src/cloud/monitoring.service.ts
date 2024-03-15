import { Injectable } from '@nestjs/common';
import { ClientsService } from '../clients/clients.service';
import { AwsCredentialsService } from '../clients/aws-credentials.service';

import { AwsInstanceList } from '../aws/aws-instance-list';
import { AwsGetMetrics } from '../aws/aws-get-metrics';
import { CloudImportService } from './cloud-import.service';
import { InfluxdbService } from '../metrics/influxdb.service';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

@Injectable()
export class MonitoringService {
  constructor(
    private readonly awsCredentialsService: AwsCredentialsService,
    private readonly cloudImportService: CloudImportService,
    private readonly influxdbService: InfluxdbService,
  ) {
    void this.run();
  }

  async run() {
    const lastImported =
      await this.cloudImportService.findOneLatestImported('aws');

    if (!lastImported) {
      // No metrics to import
      await sleep(1000);
      await this.run();
      return;
    }

    const awsCredentials = await this.awsCredentialsService.findOneByClient(
      lastImported.client,
    );

    if (awsCredentials) {
      const instanceList = new AwsInstanceList();
      const instances = await instanceList.listInstances(awsCredentials);

      for (const instance of instances) {
        const endTime = new Date();
        const startTime = new Date(endTime);
        startTime.setHours(startTime.getHours() - 1);

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
          if (metric.datetime > lastImported.lastImportedAt) {
            this.influxdbService.storeServerMetric(
              instance,
              {
                clientId: lastImported.client.id,
                cpu: metric.cpu,
                networkIn: metric.networkIn,
                networkOut: metric.networkOut,
              },
              metric.datetime,
            );

            lastImported.lastImportedAt = metric.datetime;
          }
        }
      }
    }

    await this.influxdbService.flush();
    await this.cloudImportService.save(lastImported);

    await sleep(5000);
    await this.run();
  }
}
