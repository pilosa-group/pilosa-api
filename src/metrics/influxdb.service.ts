import { Injectable } from '@nestjs/common';

import { InfluxDB, Point } from '@influxdata/influxdb-client';
import { BrowserMetric } from './metrics/metric.browser';
import { ConfigService } from '@nestjs/config';
import { InfluxdbConfig } from '../config/configuration';

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

  storeBrowserMetric(metric: BrowserMetric) {
    const p = new Point('browser')
      .tag('client', metric.clientId)
      .tag('domain', metric.domain)
      .tag('path', metric.path)
      .intField('bytes', metric.bytes)
      .intField('cachedBytes', metric.cachedBytes)
      .floatField('accuracy', metric.accuracy)
      .timestamp(new Date());

    this.writeApi.writePoint(p);
  }
}
