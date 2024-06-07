import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { SnippetConfig } from './snippet-config.entity';
import { CloudProviderAccount } from '../../cloud/entities/cloud-provider-account';

@Entity()
@Exclude()
export class Client {
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

  @Column('simple-array')
  @Expose()
  urls: string[];

  @OneToOne(() => SnippetConfig, (config: SnippetConfig) => config.client)
  @Expose()
  snippetConfig: SnippetConfig;

  @OneToMany(
    () => CloudProviderAccount,
    (cloudProviderAccount: CloudProviderAccount) => cloudProviderAccount.client,
  )
  cloudProviderAccounts: CloudProviderAccount[];
}
