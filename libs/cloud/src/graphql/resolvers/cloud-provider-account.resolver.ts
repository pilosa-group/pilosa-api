import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { ServerInstanceService } from '@app/cloud/server-instance.service';
import { ServerInstance } from '@app/cloud/entities/service-instance.entity';
import { CloudProviderAccount } from '@app/cloud/entities/cloud-provider-account.entity';

@Resolver((of) => CloudProviderAccount)
export class CloudProviderAccountResolver {
  constructor(private readonly serverInstanceService: ServerInstanceService) {}

  @ResolveField((returns) => [ServerInstance])
  async serverInstances(
    @Parent() cloudProviderAccount: CloudProviderAccount,
  ): Promise<ServerInstance[]> {
    return this.serverInstanceService.findAllByCloudProviderAccount(
      cloudProviderAccount,
    );
  }
}
