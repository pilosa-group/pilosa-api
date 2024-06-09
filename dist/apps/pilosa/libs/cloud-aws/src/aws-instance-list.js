"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AwsInstanceList = void 0;
const client_ec2_1 = require("@aws-sdk/client-ec2");
class AwsInstanceList {
    async listInstances(credentials) {
        const ec2Client = new client_ec2_1.EC2({
            apiVersion: '2010-08-01',
            region: credentials.region,
            credentials: {
                accessKeyId: credentials.accessKeyId,
                secretAccessKey: credentials.secretAccessKey,
            },
        });
        const result = await ec2Client.send(new client_ec2_1.DescribeInstancesCommand({}));
        if (!result.Reservations) {
            return [];
        }
        const instances = [];
        for (const reservation of result.Reservations) {
            if (reservation.Instances) {
                for (const instance of reservation.Instances) {
                    instances.push({
                        provider: 'aws',
                        type: 'vm',
                        tags: instance.Tags?.map((tag) => ({
                            key: tag.Key,
                            value: tag.Value,
                        })),
                        class: instance.InstanceType,
                        state: instance.State?.Name,
                        id: instance.InstanceId,
                    });
                }
            }
        }
        return instances;
    }
}
exports.AwsInstanceList = AwsInstanceList;
//# sourceMappingURL=aws-instance-list.js.map