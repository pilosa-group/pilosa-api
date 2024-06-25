import { Property, Entity, ManyToOne, PrimaryKey, Enum } from '@mikro-orm/core';
import { Domain } from '@app/web-metrics/entities/domain.entity';
import { PathStatistics } from '@app/web-metrics/entities/path-statistics.entity';

export enum AssetGroup {
  Images = 'images',
  Stylesheets = 'stylesheets',
  Scripts = 'scripts',
  Json = 'json',
  Fonts = 'fonts',
  Video = 'video',
  Audio = 'audio',
  Text = 'text',
  Other = 'other',
}

export const assetGroups: Record<string, string[]> = {
  [AssetGroup.Images]: ['image'],
  [AssetGroup.Stylesheets]: ['css'],
  [AssetGroup.Scripts]: ['javascript'],
  [AssetGroup.Json]: ['json'],
  [AssetGroup.Fonts]: ['font'],
  [AssetGroup.Video]: ['video', 'application/vnd.yt-ump'],
  [AssetGroup.Audio]: ['audio'],
  [AssetGroup.Text]: ['text'],
  [AssetGroup.Other]: [],
};

export const assetGroupKeys = Object.keys(assetGroups) as AssetGroup[];

@Entity()
export class AssetGroupStatistics {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id: string;

  @Property({
    type: 'timestamptz',
    defaultRaw: 'CURRENT_TIMESTAMP',
  })
  createdAt!: Date;

  @Enum(() => AssetGroup)
  name!: AssetGroup;

  @Property({ type: 'int' })
  bytesUncompressed: number = 0;

  @Property({ type: 'int' })
  bytesCompressed: number = 0;

  @Property({ type: 'float' })
  cdnPercentage: number = 0;

  @Property({ type: 'float' })
  cachePercentage: number = 0;

  @Property({ type: 'int' })
  numberOfRequests: number = 0;

  @ManyToOne({
    entity: () => PathStatistics,
  })
  pathStats!: PathStatistics;

  @ManyToOne({
    entity: () => Domain,
  })
  domain!: Domain;
}
