import {
  PrimaryKey,
  Entity,
  ManyToOne,
  Property,
  OneToMany,
  Collection,
} from '@mikro-orm/core';
import { BrowserMetricDomain } from '@app/web-metrics/entities/browser-metric-domain.entity';
import { BrowserMetricPathStats } from '@app/web-metrics/entities/browser-metric-path-stats.entity';

@Entity()
export class BrowserMetricPath {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id: string;

  @Property()
  title!: string;

  @Property()
  path!: string;

  @ManyToOne({
    entity: () => BrowserMetricDomain,
  })
  domain!: BrowserMetricDomain;

  @OneToMany(
    () => BrowserMetricPathStats,
    (stats: BrowserMetricPathStats) => stats.path,
  )
  stats = new Collection<BrowserMetricPathStats>(this);
}
