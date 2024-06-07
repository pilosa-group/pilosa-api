import {
  Args,
  ArgsType,
  Field,
  ID,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { ServerInstance } from '@app/cloud/entities/service-instance.entity';
import { ServerMetricService } from '@app/cloud-metrics/server-metric.service';
import { NotFoundException } from '@nestjs/common';
import { ServerInstanceService } from '@app/cloud/server-instance.service';
import {
  MetricPeriod,
  MetricPeriodValue,
  periodToMilliseconds,
} from '@app/cloud/enum/metric-period.enum';
import { GraphQLString } from 'graphql/type';
import { TeadsAWS } from '@grnsft/if-unofficial-plugins';
import { Metric } from '@app/metrics/models/metric.model';

@ArgsType()
class GetMetricsArgs {
  @Field((type) => MetricPeriod)
  period?: string;

  @Field()
  startDate?: Date;

  @Field()
  endDate?: Date;

  @Field((type) => [GraphQLString])
  models: string[];
}

@Resolver((of) => ServerInstance)
export class ServerInstanceResolver {
  constructor(
    private readonly serverInstanceService: ServerInstanceService,
    private readonly serverMetricService: ServerMetricService,
  ) {}

  @Query((returns) => ServerInstance)
  async serverInstance(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<ServerInstance> {
    const serverInstance = await this.serverInstanceService.findOneById(id);

    if (!serverInstance) {
      throw new NotFoundException();
    }

    return serverInstance;
  }

  @ResolveField((returns) => [Metric])
  async metrics(
    @Parent() serverInstance: ServerInstance,
    @Args() args: GetMetricsArgs,
  ): Promise<Metric[]> {
    const serverMetrics = await this.serverMetricService.getMetricsByPeriod(
      serverInstance,
      args.period as MetricPeriodValue,
      args.startDate,
      args.endDate,
    );

    const metrics = [];

    for (const model of args.models) {
      switch (model) {
        case 'utilization':
          metrics.push(
            ...serverMetrics.map((serverMetric) => ({
              name: model,
              ...serverMetric,
            })),
          );
          break;
        case 'teads':
          const teads = TeadsAWS({});

          const teadsMetrics = await teads.execute(
            serverMetrics.map((serverMetric) => ({
              name: model,
              period: serverMetric.period,
              duration: periodToMilliseconds(args.period as MetricPeriod),
              timestamp: serverMetric.period,
              'cloud/instance-type': serverInstance.class,
              'cpu/utilization': serverMetric.cpu,
            })),
          );

          metrics.push(
            ...teadsMetrics.map((metric) => ({
              ...metric,
              embodiedCarbon: metric['carbon-embodied'],
            })),
          );
          break;
        default:
          break;
      }
    }

    return metrics;
  }
}
