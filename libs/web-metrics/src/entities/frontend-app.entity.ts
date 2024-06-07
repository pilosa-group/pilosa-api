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
import { BrowserMetric } from './browser-metric.entity';
import { Project } from '@app/project/entities/project.entity';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { GraphQLString } from 'graphql/type';
import { BrowserMetricCrossOrigin } from '@app/web-metrics/entities/browser-metric-cross-origin.entity';

@Entity()
@ObjectType()
export class FrontendApp {
  @PrimaryGeneratedColumn('uuid')
  @Field((type) => ID)
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @Column()
  @Field()
  name: string;

  @Column('simple-array')
  @Field((type) => [GraphQLString])
  urls: string[];

  @ManyToOne(() => Project, (project: Project) => project.frontendApps)
  @JoinColumn()
  @Field((type) => Project)
  project: Project;

  @OneToMany(() => BrowserMetric, (metric: BrowserMetric) => metric.frontendApp)
  @Field((type) => [BrowserMetric], { nullable: 'items' })
  metrics: BrowserMetric[];

  @OneToMany(
    () => BrowserMetricCrossOrigin,
    (crossOrigin: BrowserMetricCrossOrigin) => crossOrigin.frontendApp,
  )
  @Field((type) => [BrowserMetric], { nullable: 'items' })
  crossOrigins: BrowserMetricCrossOrigin[];
}
