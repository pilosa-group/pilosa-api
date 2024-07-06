import { Entity, PrimaryKey, PrimaryKeyProp, Property } from '@mikro-orm/core';

@Entity()
export class ServerMetric {
  [PrimaryKeyProp]?: ['id', 'time'];

  @Property({ type: 'float' })
  cpu: number = 0;

  @Property({ nullable: true, type: 'float' })
  diskReadOps?: number;

  @Property({ nullable: true, type: 'float' })
  diskWriteOps?: number;

  @PrimaryKey({ defaultRaw: 'gen_random_uuid()', type: 'uuid' })
  id: string;

  @Property({ nullable: true, type: 'float' })
  networkIn?: number;

  @Property({ nullable: true, type: 'float' })
  networkOut?: number;

  /**
   * This can not be a foreign key because the server metrics
   * table is a TimescaleDB hypertable and foreign keys are not
   * supported.
   *
   * It should also improve performance.
   */
  @Property({ index: true, type: 'uuid' })
  serverInstance!: string;

  @PrimaryKey({
    defaultRaw: 'CURRENT_TIMESTAMP',
    type: 'timestamptz',
  })
  time!: Date;
}
