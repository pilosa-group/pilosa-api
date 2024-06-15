import { Property, Entity, ManyToOne, Enum, PrimaryKey } from '@mikro-orm/core';
import { FrontendApp } from './frontend-app.entity';

export enum ColorScheme {
  Dark = 'dark',
  Light = 'light',
}

@Entity()
export class BrowserMetric {
  @PrimaryKey({
    unique: false,
    type: 'timestamptz',
    defaultRaw: 'CURRENT_TIMESTAMP',
  })
  time!: Date;

  @Property()
  firstLoad!: boolean;

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
  })
  frontendApp!: FrontendApp;
}
