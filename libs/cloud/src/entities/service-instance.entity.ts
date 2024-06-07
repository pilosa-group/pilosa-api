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

@Entity()
@ObjectType()
export class ServerInstance {
  @PrimaryGeneratedColumn('uuid')
  @Field((type) => ID)
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
  tags: InstanceTag[] = [];

  @ManyToOne(
    () => CloudProviderAccount,
    (cloudProviderAccount: CloudProviderAccount) =>
      cloudProviderAccount.serverInstances,
  )
  @JoinColumn()
  @Field((type) => [CloudProviderAccount], { nullable: 'items' })
  cloudProviderAccount: CloudProviderAccount;

  @OneToMany(
    () => ServerMetric,
    (metric: ServerMetric) => metric.serverInstance,
  )
  @Field((type) => [ServerMetric], { nullable: 'items' })
  metrics: ServerMetric[];
}
