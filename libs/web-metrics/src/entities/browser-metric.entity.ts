import {
  Entity,
  Enum,
  PrimaryKey,
  PrimaryKeyProp,
  Property,
} from '@mikro-orm/core';
import { Expose } from 'class-transformer';

export enum ColorScheme {
  Dark = 'dark',
  Light = 'light',
}

@Entity()
export class BrowserMetric {
  [PrimaryKeyProp]?: ['id', 'time'];

  @Property({ nullable: true, type: 'text' })
  browser?: string;

  @Property({ type: 'float' })
  bytesCompressed!: number;

  @Property({ type: 'float' })
  bytesUncompressed!: number;

  @Enum(() => ColorScheme)
  colorScheme: ColorScheme = ColorScheme.Light;

  @Property({ nullable: true, type: 'text' })
  cpu?: string;

  @Property({ nullable: true, type: 'text' })
  device?: string;

  @Property({ nullable: true, type: 'text' })
  deviceType?: string;

  @Property({ type: 'text' })
  domain!: string;

  @Property({ nullable: true, type: 'text' })
  extension?: string;

  @Property({ nullable: true })
  firstLoad: boolean;

  /**
   * This can not be a foreign key because the server metrics
   * table is a TimescaleDB hypertable and foreign keys are not
   * supported.
   *
   * It should also improve performance.
   */
  @Property({ index: true, type: 'uuid' })
  frontendApp!: string;

  @PrimaryKey({ defaultRaw: 'gen_random_uuid()', type: 'uuid' })
  id: string;

  @Property({ nullable: true, type: 'text' })
  initiatorType?: string;

  @Property({ nullable: true, type: 'text' })
  os?: string;

  @Property({ nullable: true })
  pageLoaded: boolean;

  @Property({ type: 'text' })
  path!: string;

  @PrimaryKey({
    defaultRaw: 'CURRENT_TIMESTAMP',
    type: 'timestamptz',
  })
  @Expose()
  time!: Date;

  @Property({ nullable: true, type: 'int' })
  viewportHeight?: number;

  @Property({ nullable: true, type: 'int' })
  viewportWidth?: number;

  @Property({ nullable: true, type: 'text' })
  visitor?: string;
}
