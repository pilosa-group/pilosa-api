import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  OneToMany,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { CloudProviderAccount } from './cloud-provider-account.entity';
import { InstanceTag } from '../cloud-provider-instance-list.interface';
import { ServerMetric } from '@app/cloud-metrics/entities/server-metric.entity';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Metric } from '@app/metrics/models/metric.model';

@ObjectType()
class ServerInstanceTag {
  @Field()
  key: string;
  @Field()
  value: string;
}

@Entity()
@ObjectType()
export class ServerInstance {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @Column()
  @Field()
  class: string;

  @Column()
  @Field()
  state: string;

  @Column()
  @Field()
  instanceId: string;

  @Column('simple-json')
  @Field(() => [ServerInstanceTag], { nullable: 'items' })
  tags: InstanceTag[] = [];

  @ManyToOne(
    () => CloudProviderAccount,
    (cloudProviderAccount: CloudProviderAccount) =>
      cloudProviderAccount.serverInstances,
  )
  @JoinColumn()
  @Field(() => [CloudProviderAccount], { nullable: 'items' })
  cloudProviderAccount: CloudProviderAccount;

  @OneToMany(
    () => ServerMetric,
    (metric: ServerMetric) => metric.serverInstance,
  )
  @Field(() => [Metric], { nullable: 'items' })
  metrics: ServerMetric[];
}
