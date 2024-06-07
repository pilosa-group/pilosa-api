import { Field, InterfaceType, ObjectType } from '@nestjs/graphql';

@InterfaceType({
  isAbstract: true,
  resolveType(metric) {
    switch (metric.name) {
      case 'utilization':
        return UtilizationMetric;
      case 'teads':
        return TeadsAWSMetric;
      default:
        return null;
    }
  },
})
export abstract class Metric {
  @Field()
  period: Date;

  @Field()
  name: string;
}

@ObjectType({
  implements: [Metric],
})
export class TeadsAWSMetric extends Metric {
  @Field({ nullable: true })
  energy: number;

  @Field({ nullable: true })
  embodiedCarbon: number;
}

@ObjectType({
  implements: [Metric],
})
export class UtilizationMetric extends Metric {
  @Field()
  cpu: number;

  @Field({ nullable: true })
  networkIn: number;

  @Field({ nullable: true })
  networkOut: number;

  @Field({ nullable: true })
  diskReadOps: number;

  @Field({ nullable: true })
  diskWriteOps: number;
}
