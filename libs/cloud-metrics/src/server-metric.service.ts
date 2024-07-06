import { MetricResult } from '@app/cloud/cloud-provider-metrics.interface';
import { ServerInstance } from '@app/cloud/entities/server-instance.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';

import { ServerMetric } from './entities/server-metric.entity';

@Injectable()
export class ServerMetricService {
  constructor(
    @InjectRepository(ServerMetric)
    private serverMetricRepository: EntityRepository<ServerMetric>,
  ) {}

  async create(
    metricResult: MetricResult,
    serverInstance: ServerInstance,
  ): Promise<ServerMetric> {
    return this.serverMetricRepository.create({
      cpu: metricResult.cpu,
      diskReadOps: metricResult.diskReadOps,
      diskWriteOps: metricResult.diskWriteOps,
      networkIn: metricResult.networkIn,
      networkOut: metricResult.networkOut,
      serverInstance: serverInstance['id'],
      time: metricResult.datetime,
    });
  }

  findAllByServerInstance(
    serverInstance: ServerInstance,
  ): Promise<ServerMetric[]> {
    return this.serverMetricRepository
      .createQueryBuilder()
      .where({
        serverInstance: serverInstance.id,
      })
      .getResult();
  }

  async getLastImportedDate(serverInstance: ServerInstance): Promise<Date> {
    const metric = await this.serverMetricRepository
      .createQueryBuilder()
      .where({
        serverInstance: serverInstance.id,
      })
      .orderBy({
        time: 'DESC',
      })
      .getSingleResult();

    if (!metric) {
      return null;
    }

    return metric.time;
  }

  async save(serverMetric: ServerMetric): Promise<ServerMetric> {
    this.serverMetricRepository.getEntityManager().persist(serverMetric);

    await this.serverMetricRepository.getEntityManager().flush();

    return serverMetric;
  }

  // async getMetricsByPeriod(
  //   serverInstance: ServerInstance,
  //   timeBucket: MetricPeriodValue,
  //   start: Date,
  //   end: Date,
  // ): Promise<ServerMetric[]> {
  //   return this.serverMetricRepository.manager.query(
  //     `SELECT time_bucket($1, sm.time) AS period,
  //             COUNT(*),
  //             AVG(sm.cpu) AS cpu,
  //             AVG(sm."networkIn") AS networkIn,
  //             AVG(sm."networkOut") AS networkOut,
  //             AVG(sm."diskReadOps") AS diskReadOps,
  //             AVG(sm."diskWriteOps") AS diskWriteOps
  //
  //      FROM server_metric sm
  //
  //      WHERE sm."serverInstanceId" = $2
  //      AND sm.time > $3
  //       AND sm.time < $4
  //
  //      GROUP BY period
  //      ORDER BY period DESC`,
  //     [timeBucket, serverInstance.id, start, end],
  //   );
  // }
}
