import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { FrontendApp } from '@app/web-metrics/entities/frontend-app.entity';
import { CloudProviderAccount } from '@app/cloud/entities/cloud-provider-account.entity';

@Entity()
@Exclude()
export class Project {
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
  name: string;

  @OneToMany(
    () => CloudProviderAccount,
    (cloudProviderAccount: CloudProviderAccount) =>
      cloudProviderAccount.project,
  )
  cloudProviderAccounts: CloudProviderAccount[];

  @OneToMany(
    () => FrontendApp,
    (frontendApp: FrontendApp) => frontendApp.project,
  )
  frontendApps: FrontendApp[];
}
