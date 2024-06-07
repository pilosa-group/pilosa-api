import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServerMetric } from './entities/server-metric.entity';
import { MetricResult } from '@app/cloud/cloud-provider-metrics.interface';
import { ServerInstance } from '@app/cloud/entities/service-instance.entity';

type TimeBucket =
  | '1 hour'
  | '45 minutes'
  | '30 minutes'
  | '15 minutes'
  | '5 minutes'
  | '1 minute';

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
    serverInstanceId: ServerInstance['id'],
    timeBucket: TimeBucket,
    start: Date,
    end: Date,
  ): Promise<ServerMetric[]> {
    // SELECT time_bucket('10 minutes', time) AS bucket,
    //
    // COUNT(*),
    // AVG(cpu) AS cpu,
    //   AVG("networkIn") AS networkIn,
    //   AVG("networkOut") AS networkOut
    //
    // FROM server_metric
    // WHERE time > NOW() - INTERVAL '3 hours'
    // GROUP BY bucket
    // ORDER BY bucket DESC
    //

    return this.serverMetricRepository.manager
      .query(`SELECT time_bucket('15 minutes', time) AS bucket,
    
     COUNT(*),
        AVG(cpu) AS cpu,
       AVG("networkIn") AS networkIn,
       AVG("networkOut") AS networkOut
    
     FROM server_metric
     
     GROUP BY bucket
     ORDER BY bucket DESC
     LIMIT 100`);

    //   .createQueryBuilder('sm')
    //
    //   .select(`time_bucket("${timeBucket}", sm.time) AS bucket`)
    //   .where('sm.serverInstance = :instanceId', {
    //     instanceId: serverInstanceId,
    //   })
    //   .andWhere('sm.time > :start', { start })
    //   .andWhere('sm.time < :end', { end })
    //   .orderBy('bucket', 'DESC')
    //   .getMany();
  }
}
