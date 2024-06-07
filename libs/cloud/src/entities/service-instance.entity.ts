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
import { Exclude, Expose } from 'class-transformer';
import { CloudProviderAccount } from './cloud-provider-account.entity';
import { InstanceTag } from '../cloud-provider-instance-list.interface';
import { ServerMetric } from '@app/cloud-metrics/entities/server-metric.entity';

@Entity()
@Exclude()
export class ServerInstance {
  @PrimaryGeneratedColumn('uuid')
  @Expose()
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @Column()
  @Expose()
  class: string;

  @Column()
  @Expose()
  state: string;

  @Column()
  @Expose()
  instanceId: string;

  @Column('simple-json')
  @Expose()
  tags: InstanceTag[] = [];

  @ManyToOne(
    () => CloudProviderAccount,
    (cloudProviderAccount: CloudProviderAccount) =>
      cloudProviderAccount.serverInstances,
  )
  @JoinColumn()
  cloudProviderAccount: CloudProviderAccount;

  @OneToMany(
    () => ServerMetric,
    (metric: ServerMetric) => metric.serverInstance,
  )
  metrics: ServerMetric[];
}
