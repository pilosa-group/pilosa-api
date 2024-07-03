import {
  Property,
  Entity,
  Enum,
  PrimaryKey,
  PrimaryKeyProp,
} from '@mikro-orm/core';
import { Expose } from 'class-transformer';

export enum ColorScheme {
  Dark = 'dark',
  Light = 'light',
}

@Entity()
export class BrowserMetric {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id: string;

  @PrimaryKey({
    type: 'timestamptz',
    defaultRaw: 'CURRENT_TIMESTAMP',
  })
  @Expose()
  time!: Date;

  [PrimaryKeyProp]?: ['id', 'time'];

  @Property({ nullable: true })
  firstLoad: boolean;

  @Property({ nullable: true })
  pageLoaded: boolean;

  @Enum(() => ColorScheme)
  colorScheme: ColorScheme = ColorScheme.Light;

  @Property({ type: 'text' })
  domain!: string;

  @Property({ type: 'text' })
  path!: string;

  @Property({ nullable: true, type: 'text' })
  initiatorType?: string;

  @Property({ nullable: true, type: 'text' })
  extension?: string;

  @Property({ type: 'float' })
  bytesCompressed!: number;

  @Property({ type: 'float' })
  bytesUncompressed!: number;

  @Property({ nullable: true, type: 'text' })
  visitor?: string;

  @Property({ nullable: true, type: 'text' })
  deviceType?: string;

  @Property({ nullable: true, type: 'text' })
  device?: string;

  @Property({ nullable: true, type: 'text' })
  os?: string;

  @Property({ nullable: true, type: 'text' })
  browser?: string;

  @Property({ nullable: true, type: 'text' })
  cpu?: string;

  /**
   * This can not be a foreign key because the server metrics
   * table is a TimescaleDB hypertable and foreign keys are not
   * supported.
   *
   * It should also improve performance.
   */
  @Property({ type: 'uuid', index: true })
  frontendApp!: string;
}
