import {
  Entity,
  OneToMany,
  ManyToOne,
  PrimaryKey,
  Property,
  Collection,
  Cascade,
} from '@mikro-orm/core';
import { BrowserMetric } from './browser-metric.entity';
import { Project } from '@app/project/entities/project.entity';
import { BrowserMetricCrossOrigin } from '@app/web-metrics/entities/browser-metric-cross-origin.entity';

@Entity()
export class FrontendApp {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id: string;

  @Property()
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt?: Date;

  @Property()
  name!: string;

  @Property()
  urls!: string[];

  @ManyToOne({
    entity: () => Project,
  })
  project: Project;

  @OneToMany(
    () => BrowserMetric,
    (metric: BrowserMetric) => metric.frontendApp,
    {
      cascade: [Cascade.PERSIST, Cascade.REMOVE],
    },
  )
  metrics = new Collection<BrowserMetric>(this);

  @OneToMany(
    () => BrowserMetricCrossOrigin,
    (crossOrigin: BrowserMetricCrossOrigin) => crossOrigin.frontendApp,
    {
      cascade: [Cascade.PERSIST, Cascade.REMOVE],
    },
  )
  crossOrigins = new Collection<BrowserMetricCrossOrigin>(this);
}
