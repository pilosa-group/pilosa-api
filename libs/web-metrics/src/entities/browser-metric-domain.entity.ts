import {
  Cascade,
  Collection,
  Entity,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { BrowserMetricPath } from '@app/web-metrics/entities/browser-metric-path.entity';

@Entity()
export class BrowserMetricDomain {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id: string;

  @PrimaryKey({ type: 'string', unique: true })
  domain!: string;

  @Property({ type: 'boolean' })
  isGreenHost!: boolean;

  @OneToMany(
    () => BrowserMetricPath,
    (path: BrowserMetricPath) => path.domain,
    { cascade: [Cascade.PERSIST, Cascade.REMOVE] },
  )
  paths = new Collection<BrowserMetricPath>(this);
}
