import { DescribeInstancesCommand, EC2 } from '@aws-sdk/client-ec2';
import {
  Instance,
  CloudProviderInstanceList,
  AwsCredentials,
} from '../cloud/cloud-provider-instance-list.interface';

export class AwsInstanceList implements CloudProviderInstanceList {
  async listInstances(credentials: AwsCredentials): Promise<Instance[]> {
    const ec2Client = new EC2({
      apiVersion: '2010-08-01',
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: credentials.accessKeyId,
        secretAccessKey: credentials.secretAccessKey,
      },
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
            provider: 'aws',
            type: 'vm',
            class: instance.InstanceType as string,
            state: instance.State?.Name as Instance['state'],
            id: instance.InstanceId as string,
          });
        }
      }
    }

    return instances;
  }
}
