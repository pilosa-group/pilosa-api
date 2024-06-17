import {
  Cascade,
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { BrowserMetricAssetGroup } from '@app/web-metrics/entities/browser-metric-asset-group.entity';
import { BrowserMetricPath } from '@app/web-metrics/entities/browser-metric-path.entity';

@Entity()
export class BrowserMetricPathStats {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id: string;

  @Property({
    type: 'timestamptz',
    defaultRaw: 'CURRENT_TIMESTAMP',
  })
  createdAt!: Date;

  @Property({ type: 'float' })
  domReadyTime!: number;

  @Property({ type: 'float' })
  loadTime!: number;

  @Property({ type: 'float' })
  networkIdleTime!: number;

  @OneToMany(
    () => BrowserMetricAssetGroup,
    (assetGroup: BrowserMetricAssetGroup) => assetGroup.pathStats,
    {
      cascade: [Cascade.PERSIST, Cascade.REMOVE],
    },
  )
  assetGroups = new Collection<BrowserMetricAssetGroup>(this);

  @ManyToOne({
    entity: () => BrowserMetricPath,
  })
  path!: BrowserMetricPath;
}
