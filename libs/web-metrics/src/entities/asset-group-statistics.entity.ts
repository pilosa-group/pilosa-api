import { Domain } from '@app/web-metrics/entities/domain.entity';
import { PathStatistics } from '@app/web-metrics/entities/path-statistics.entity';
import { Entity, Enum, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';

export enum AssetGroup {
  Audio = 'audio',
  Fonts = 'fonts',
  Images = 'images',
  Json = 'json',
  Other = 'other',
  Scripts = 'scripts',
  Stylesheets = 'stylesheets',
  Text = 'text',
  Video = 'video',
}

export const assetGroups: Record<string, string[]> = {
  [AssetGroup.Audio]: ['audio'],
  [AssetGroup.Fonts]: ['font'],
  [AssetGroup.Images]: ['image'],
  [AssetGroup.Json]: ['json'],
  [AssetGroup.Other]: [],
  [AssetGroup.Scripts]: ['javascript'],
  [AssetGroup.Stylesheets]: ['css'],
  [AssetGroup.Text]: ['text'],
  [AssetGroup.Video]: ['video', 'application/vnd.yt-ump'],
};

export const assetGroupKeys = Object.keys(assetGroups) as AssetGroup[];

@Entity()
export class AssetGroupStatistics {
  @Property({ type: 'int' })
  bytesCompressed: number = 0;

  @Property({ type: 'int' })
  bytesUncompressed: number = 0;

  @Property({ type: 'float' })
  cachePercentage: number = 0;

  @Property({ type: 'float' })
  cdnPercentage: number = 0;

  @Property({
    defaultRaw: 'CURRENT_TIMESTAMP',
    type: 'timestamptz',
  })
  createdAt!: Date;

  @ManyToOne({
    deleteRule: 'cascade',
    entity: () => Domain,
  })
  domain!: Domain;

  @PrimaryKey({ defaultRaw: 'gen_random_uuid()', type: 'uuid' })
  id: string;

  @Enum(() => AssetGroup)
  name!: AssetGroup;

  @Property({ type: 'int' })
  numberOfRequests: number = 0;

  @ManyToOne({
    deleteRule: 'cascade',
    entity: () => PathStatistics,
  })
  pathStats!: PathStatistics;
}
