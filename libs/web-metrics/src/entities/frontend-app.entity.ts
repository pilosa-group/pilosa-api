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
import { Project } from '@app/project';

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

  @ManyToOne(() => Project, (project: Project) => project.frontendApps)
  @JoinColumn()
  project: Project;

  @OneToMany(() => BrowserMetric, (metric: BrowserMetric) => metric.frontendApp)
  metrics: BrowserMetric[];
}
