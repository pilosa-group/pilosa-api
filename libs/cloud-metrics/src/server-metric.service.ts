import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServerMetric } from './entities/server-metric.entity';
import { MetricResult } from '@app/cloud/cloud-provider-metrics.interface';
import { ServerInstance } from '@app/cloud/entities/service-instance.entity';
import { MetricPeriodValue } from '@app/cloud/enum/metric-period.enum';

@Injectable()
export class ServerMetricService {
  constructor(
    @InjectRepository(ServerMetric)
    private serverMetricRepository: Repository<ServerMetric>,
  ) {}

  async create(
    metricResult: MetricResult,
    serverInstance: ServerInstance,
  ): Promise<ServerMetric> {
    return this.serverMetricRepository.create({
      serverInstance: serverInstance,
      time: metricResult.datetime,
      cpu: metricResult.cpu,
      networkIn: metricResult.networkIn,
      networkOut: metricResult.networkOut,
      diskReadOps: metricResult.diskReadOps,
      diskWriteOps: metricResult.diskWriteOps,
    });
  }

  async getLastImportedDate(serverInstance: ServerInstance): Promise<Date> {
    const metric = await this.serverMetricRepository
      .createQueryBuilder('sm')
      .where('sm.serverInstance = :instanceId', {
        instanceId: serverInstance.id,
      })
      .orderBy('sm.time', 'DESC')
      .getOne();

    if (!metric) {
      return null;
    }

    return metric.time;
  }

  async save(serverMetric: ServerMetric): Promise<ServerMetric> {
    return this.serverMetricRepository.save(serverMetric);
  }

  findAllByServerInstance(
    serverInstance: ServerInstance,
  ): Promise<ServerMetric[]> {
    return this.serverMetricRepository
      .createQueryBuilder('sm')
      .where('sm.serverInstance = :instanceId', {
        instanceId: serverInstance.id,
      })
      .getMany();
  }

  async getMetricsByPeriod(
    serverInstance: ServerInstance,
    timeBucket: MetricPeriodValue,
    start: Date,
    end: Date,
  ): Promise<ServerMetric[]> {
    return this.serverMetricRepository.manager.query(
      `SELECT time_bucket($1, sm.time) AS period,
              COUNT(*),
              AVG(sm.cpu) AS cpu,
              AVG(sm."networkIn") AS networkIn,
              AVG(sm."networkOut") AS networkOut,
              AVG(sm."diskReadOps") AS diskReadOps,
              AVG(sm."diskWriteOps") AS diskWriteOps

       FROM server_metric sm

       WHERE sm."serverInstanceId" = $2
       AND sm.time > $3
        AND sm.time < $4

       GROUP BY period
       ORDER BY period DESC`,
      [timeBucket, serverInstance.id, start, end],
    );
  }
}
