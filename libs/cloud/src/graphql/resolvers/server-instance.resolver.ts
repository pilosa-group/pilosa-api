import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { ServerInstance } from '@app/cloud/entities/service-instance.entity';
import { ServerMetric } from '@app/cloud-metrics/entities/server-metric.entity';
import { ServerMetricService } from '@app/cloud-metrics/server-metric.service';

@Resolver((of) => ServerInstance)
export class ServerInstanceResolver {
  constructor(private readonly serverMetricService: ServerMetricService) {}

  @ResolveField((returns) => [ServerMetric])
  async metrics(
    @Parent() serverInstance: ServerInstance,
  ): Promise<ServerMetric[]> {
    return this.serverMetricService.findAllByServerInstance(serverInstance);
  }
}
