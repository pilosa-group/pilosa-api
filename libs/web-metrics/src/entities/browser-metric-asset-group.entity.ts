import { Property, Entity, ManyToOne, PrimaryKey, Enum } from '@mikro-orm/core';
import { BrowserMetricPath } from '@app/web-metrics/entities/browser-metric-path.entity';
import { BrowserMetricDomain } from '@app/web-metrics/entities/browser-metric-domain.entity';
import { BrowserMetricPathStats } from '@app/web-metrics/entities/browser-metric-path-stats.entity';
import { Exclude } from 'class-transformer';
import { BrowserMetricPathService } from '@app/web-metrics/browser-metric-path.service';

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
  [AssetGroup.Video]: ['video'],
  [AssetGroup.Audio]: ['audio'],
  [AssetGroup.Text]: ['text'],
  [AssetGroup.Other]: [],
};

export const assetGroupKeys = Object.keys(assetGroups) as AssetGroup[];

@Entity()
export class BrowserMetricAssetGroup {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id: string;

  @Property({
    type: 'timestamptz',
    defaultRaw: 'CURRENT_TIMESTAMP',
  })
  createdAt!: Date;

  @Enum(() => AssetGroup)
  name!: AssetGroup;

  @Property({ type: 'float' })
  bytesUncompressed: number = 0;

  @Property({ type: 'float' })
  bytesCompressed: number = 0;

  @Property({ type: 'float' })
  cdnPercentage: number = 0;

  @Property({ type: 'float' })
  cachePercentage: number = 0;

  @Property({ type: 'int' })
  numberOfRequests: number = 0;

  @ManyToOne({
    entity: () => BrowserMetricPathStats,
  })
  pathStats!: BrowserMetricPathStats;

  @ManyToOne({
    entity: () => BrowserMetricDomain,
  })
  domain!: BrowserMetricDomain;
}
