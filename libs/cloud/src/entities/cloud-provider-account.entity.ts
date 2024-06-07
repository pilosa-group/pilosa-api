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
import { availableCloudProviders } from '../available-cloud-providers';
import { ServerInstance } from './service-instance.entity';
import { Project } from '@app/project/entities/project.entity';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { CloudProvider } from '@app/cloud/enum/cloud-provider.enum';

@Entity()
@ObjectType()
export class CloudProviderAccount {
  @PrimaryGeneratedColumn('uuid')
  @Field((type) => ID)
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
  @Field((type) => CloudProvider)
  provider: CloudProvider = CloudProvider.AWS;

  @Column('timestamp', {
    nullable: true,
  })
  @Field()
  lastImportedAt: Date;

  @Column()
  accessKeyId: string;

  @Column()
  secretAccessKey: string;

  @Column()
  @Field()
  region: string;

  @ManyToOne(() => Project, (project: Project) => project.cloudProviderAccounts)
  @Field((type) => Project)
  @JoinColumn()
  project: Project;

  @OneToMany(
    () => ServerInstance,
    (serverInstance: ServerInstance) => serverInstance.cloudProviderAccount,
  )
  @Field((type) => [ServerInstance], { nullable: 'items' })
  serverInstances: ServerInstance[];
}
