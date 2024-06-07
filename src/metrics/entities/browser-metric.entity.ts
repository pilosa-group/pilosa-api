import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { FrontendApp } from './frontend-app.entity';

@Entity()
@Exclude()
export class BrowserMetric {
  @PrimaryGeneratedColumn('uuid')
  @Expose()
  id: string;

  @CreateDateColumn()
  @Expose()
  time: Date;

  @Column()
  @Expose()
  domain: string;

  @Column()
  @Expose()
  path: string;

  @Column()
  @Expose()
  userAgent: string;

  @Column('float')
  @Expose()
  bytes: number;

  @Column('float')
  @Expose()
  bytesCached: number;

  @Column('float')
  @Expose()
  accuracy: number;

  @ManyToOne(
    () => FrontendApp,
    (frontendApp: FrontendApp) => frontendApp.metrics,
  )
  @JoinColumn()
  frontendApp: FrontendApp;
}
