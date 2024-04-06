import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  JoinColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { availableCloudProviders } from '../available-cloud-providers';
import { ServerInstance } from './service-instance.entity';
import { Client } from '@app/client';

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
