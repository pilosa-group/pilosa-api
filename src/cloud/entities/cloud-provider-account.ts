import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { Client } from '../../clients/entities/client.entity';
import { availableCloudProviders } from '../available-cloud-providers';
import { ServerMetric } from '../../metrics/entities/server-metric.entity';
import { ServerInstance } from './service-instance.entity';

@Entity()
export class CloudProviderAccount {
  @PrimaryGeneratedColumn('uuid')
  @Expose()
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @Column('simple-enum', {
    enum: availableCloudProviders,
  })
  provider: 'aws';

  @Column('timestamp', {
    nullable: true,
  })
  lastImportedAt: Date;

  @Column()
  @Exclude()
  accessKeyId: string;

  @Column()
  @Exclude()
  secretAccessKey: string;

  @Column()
  @Exclude()
  region: string;

  @ManyToOne(() => Client, (client: Client) => client.cloudProviderAccounts)
  @JoinColumn()
  client: Client;

  @OneToMany(
    () => ServerInstance,
    (serverInstance: ServerInstance) => serverInstance.cloudProviderAccount,
  )
  serverInstances: ServerInstance[];
}
