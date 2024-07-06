import { AssetGroupStatistics } from '@app/web-metrics/entities/asset-group-statistics.entity';
import { Path } from '@app/web-metrics/entities/path.entity';
import {
  Cascade,
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';

@Entity()
export class PathStatistics {
  @OneToMany(
    () => AssetGroupStatistics,
    (assetGroup: AssetGroupStatistics) => assetGroup.pathStats,
    {
      cascade: [Cascade.PERSIST, Cascade.REMOVE],
    },
  )
  assetGroups = new Collection<AssetGroupStatistics>(this);

  @Property({
    defaultRaw: 'CURRENT_TIMESTAMP',
    type: 'timestamptz',
  })
  createdAt!: Date;

  @Property({ type: 'float' })
  domReadyTime!: number;

  @PrimaryKey({ defaultRaw: 'gen_random_uuid()', type: 'uuid' })
  id: string;

  @Property({ type: 'float' })
  loadTime!: number;

  @Property({ type: 'float' })
  networkIdleTime!: number;

  @ManyToOne({
    deleteRule: 'cascade',
    entity: () => Path,
  })
  path!: Path;
}
