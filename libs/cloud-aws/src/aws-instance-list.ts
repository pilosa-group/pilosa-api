import {
  AwsCredentials,
  CloudProviderInstanceList,
  Instance,
} from '@app/cloud/cloud-provider-instance-list.interface';
import { DescribeInstancesCommand, EC2 } from '@aws-sdk/client-ec2';

export class AwsInstanceList implements CloudProviderInstanceList {
  async listInstances(credentials: AwsCredentials): Promise<Instance[]> {
    const ec2Client = new EC2({
      apiVersion: '2010-08-01',
      credentials: {
        accessKeyId: credentials.accessKeyId,
        secretAccessKey: credentials.secretAccessKey,
      },
      region: credentials.region,
    });

    const result = await ec2Client.send(new DescribeInstancesCommand({}));

    if (!result.Reservations) {
      return [];
    }

    const instances: Instance[] = [];

    for (const reservation of result.Reservations) {
      if (reservation.Instances) {
        for (const instance of reservation.Instances) {
          instances.push({
            class: instance.InstanceType as string,
            id: instance.InstanceId as string,
            provider: 'aws',
            state: instance.State?.Name as Instance['state'],
            tags: instance.Tags?.map((tag) => ({
              key: tag.Key as string,
              value: tag.Value as string,
            })),
            type: 'vm',
          });
        }
      }
    }

    return instances;
  }
}
