import { forwardRef, Inject } from '@nestjs/common';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { FrontendApp } from '@app/web-metrics/entities/frontend-app.entity';
import { BrowserMetric } from '@app/web-metrics/entities/browser-metric.entity';
import { BrowserMetricService } from '@app/web-metrics/browser-metric.service';

@Resolver((of) => FrontendApp)
export class FrontendAppResolver {
  constructor(
    // @Inject(forwardRef(() => OrganizationService))
    private readonly browserMetricService: BrowserMetricService,
  ) {}

  @ResolveField((returns) => [BrowserMetric])
  async metrics(@Parent() frontendApp: FrontendApp): Promise<BrowserMetric[]> {
    console.log({ frontendApp });
    return this.browserMetricService.findAllByFrontendApp(frontendApp);
  }
}
