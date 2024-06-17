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
  @PrimaryKey({ type: 'string', unique: true })
  fqdn: string;

  @Property({
    type: 'timestamptz',
    defaultRaw: 'CURRENT_TIMESTAMP',
  })
  createdAt!: Date;

  @Property({ type: 'boolean' })
  isGreenHost!: boolean;

  @OneToMany(
    () => BrowserMetricPath,
    (path: BrowserMetricPath) => path.domain,
    {
      cascade: [Cascade.PERSIST, Cascade.REMOVE],
    },
  )
  paths = new Collection<BrowserMetricPath>(this);

  constructor(fqdn: string) {
    this.fqdn = fqdn;
  }
}
