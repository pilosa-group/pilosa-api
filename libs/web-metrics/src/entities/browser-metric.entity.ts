import {
  Property,
  Entity,
  ManyToOne,
  Enum,
  PrimaryKey,
  ManyToMany,
  Collection,
} from '@mikro-orm/core';
import { FrontendApp } from './frontend-app.entity';
import { PathStatistics } from '@app/web-metrics/entities/path-statistics.entity';
import { Exclude, Expose } from 'class-transformer';

export enum ColorScheme {
  Dark = 'dark',
  Light = 'light',
}

@Entity()
@Exclude()
export class BrowserMetric {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id: string;

  @Property({
    type: 'timestamptz',
    defaultRaw: 'CURRENT_TIMESTAMP',
  })
  @Expose()
  time!: Date;

  @Property({ nullable: true })
  firstLoad: boolean;

  @Property({ nullable: true })
  pageLoaded: boolean;

  @Enum(() => ColorScheme)
  colorScheme: ColorScheme = ColorScheme.Light;

  @Property()
  domain!: string;

  @Property({ type: 'text' })
  path!: string;

  @Property({ nullable: true })
  initiatorType?: string;

  @Property({ nullable: true })
  extension?: string;

  @Property({ type: 'float' })
  bytesCompressed!: number;

  @Property({ type: 'float' })
  bytesUncompressed!: number;

  @Property({ nullable: true })
  visitor?: string;

  @Property({ nullable: true })
  deviceType?: string;

  @Property({ nullable: true })
  device?: string;

  @Property({ nullable: true })
  os?: string;

  @Property({ nullable: true })
  browser?: string;

  @Property({ nullable: true })
  cpu?: string;

  @ManyToOne({
    entity: () => FrontendApp,
    deleteRule: 'cascade',
  })
  frontendApp!: FrontendApp;

  @ManyToMany({
    entity: () => PathStatistics,
    deleteRule: 'cascade',
  })
  pathStatistics = new Collection<PathStatistics>(this);
}
