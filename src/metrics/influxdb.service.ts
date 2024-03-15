import { Injectable } from '@nestjs/common';

import { InfluxDB, Point } from '@influxdata/influxdb-client';
import { BrowserMetric, ServerMetric } from './metrics/metric.browser';
import { ConfigService } from '@nestjs/config';
import { InfluxdbConfig } from '../config/configuration';
import { Instance } from '../cloud/cloud-provider-instance-list.interface';

@Injectable()
export class InfluxdbService {
  private writeApi: ReturnType<InfluxDB['getWriteApi']>;
  private queryApi: ReturnType<InfluxDB['getQueryApi']>;

  constructor(private configService: ConfigService) {
    const { url, org, token, bucket } =
      configService.get<InfluxdbConfig>('influxdb');

    const client = new InfluxDB({
      url,
      token,
    });

    this.writeApi = client.getWriteApi(org, bucket, 'ms');
    this.queryApi = client.getQueryApi(org);
  }

  async flush() {
    await this.writeApi.flush();
  }

  storeBrowserMetric(metric: BrowserMetric, timestamp: Date = new Date()) {
    const p = new Point('browser')
      .tag('client', metric.clientId)
      .tag('domain', metric.domain)
      .tag('path', metric.path)
      .intField('bytes', metric.bytes)
      .intField('cachedBytes', metric.cachedBytes)
      .floatField('accuracy', metric.accuracy)
      .timestamp(timestamp);

    this.writeApi.writePoint(p);
  }

  storeServerMetric(instance: Instance, metric: ServerMetric, timestamp: Date) {
    const p = new Point('server')
      .tag('client', metric.clientId)
      .tag('provider', instance.provider)
      .tag('class', instance.class)
      .tag('state', instance.state)
      .tag('id', instance.id)
      .timestamp(timestamp);

    if (metric.cpu !== undefined) {
      p.floatField('cpu', metric.cpu);
    }

    if (metric.networkIn !== undefined) {
      p.floatField('networkIn', metric.networkIn);
    }

    if (metric.networkOut !== undefined) {
      p.floatField('networkOut', metric.networkOut);
    }

    console.log(p);

    this.writeApi.writePoint(p);
  }
}
