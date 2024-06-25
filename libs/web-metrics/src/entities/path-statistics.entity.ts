import {
  Cascade,
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { AssetGroupStatistics } from '@app/web-metrics/entities/asset-group-statistics.entity';
import { Path } from '@app/web-metrics/entities/path.entity';

@Entity()
export class PathStatistics {
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
    () => AssetGroupStatistics,
    (assetGroup: AssetGroupStatistics) => assetGroup.pathStats,
    {
      cascade: [Cascade.PERSIST, Cascade.REMOVE],
    },
  )
  assetGroups = new Collection<AssetGroupStatistics>(this);

  @ManyToOne({
    entity: () => Path,
    deleteRule: 'cascade',
  })
  path!: Path;
}
