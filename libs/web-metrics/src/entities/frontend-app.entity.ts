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
import { BrowserMetric } from './browser-metric.entity';
import { Client } from '@app/client';

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

  @ManyToOne(() => Client, (client: Client) => client.frontendApps)
  @JoinColumn()
  client: Client;

  @OneToMany(() => BrowserMetric, (metric: BrowserMetric) => metric.frontendApp)
  metrics: BrowserMetric[];
}
