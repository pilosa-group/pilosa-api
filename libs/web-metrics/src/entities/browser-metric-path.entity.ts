import {
  PrimaryKey,
  Entity,
  ManyToOne,
  Property,
  OneToMany,
  Collection,
  PrimaryKeyProp,
} from '@mikro-orm/core';
import { BrowserMetricDomain } from '@app/web-metrics/entities/browser-metric-domain.entity';
import { BrowserMetricPathStats } from '@app/web-metrics/entities/browser-metric-path-stats.entity';

@Entity()
export class BrowserMetricPath {
  @ManyToOne({
    primary: true,
    entity: () => BrowserMetricDomain,
  })
  domain: BrowserMetricDomain;

  @PrimaryKey({ type: 'string' })
  path: string;

  [PrimaryKeyProp]?: ['domain', 'path'];

  @Property()
  title!: string;

  @OneToMany(
    () => BrowserMetricPathStats,
    (stats: BrowserMetricPathStats) => stats.path,
  )
  stats = new Collection<BrowserMetricPathStats>(this);

  constructor(domain: BrowserMetricDomain, path: string) {
    this.domain = domain;
    this.path = path;
  }
}
