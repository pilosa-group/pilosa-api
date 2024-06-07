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
import { Project } from '@app/project';

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

  @ManyToOne(() => Project, (project: Project) => project.cloudProviderAccounts)
  @JoinColumn()
  project: Project;

  @OneToMany(
    () => ServerInstance,
    (serverInstance: ServerInstance) => serverInstance.cloudProviderAccount,
  )
  serverInstances: ServerInstance[];
}
