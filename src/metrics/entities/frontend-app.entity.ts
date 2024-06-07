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
  OneToOne,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { Client } from '../../clients/entities/client.entity';
import { BrowserMetric } from './browser-metric.entity';
import { SnippetConfig } from './snippet-config.entity';

@Entity()
@Exclude()
export class FrontendApp {
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

  @ManyToOne(() => Client, (client: Client) => client.frontendApps)
  @JoinColumn()
  client: Client;

  @OneToMany(() => BrowserMetric, (metric: BrowserMetric) => metric.frontendApp)
  metrics: BrowserMetric[];
}
