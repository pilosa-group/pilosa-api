import { Entity, PrimaryKey, PrimaryKeyProp, Property } from '@mikro-orm/core';

@Entity()
export class ServerMetric {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id: string;

  @PrimaryKey({
    type: 'timestamptz',
    defaultRaw: 'CURRENT_TIMESTAMP',
  })
  time!: Date;

  [PrimaryKeyProp]?: ['id', 'time'];

  @Property({ type: 'float' })
  cpu: number = 0;

  @Property({ type: 'float', nullable: true })
  networkIn?: number;

  @Property({ type: 'float', nullable: true })
  networkOut?: number;

  @Property({ type: 'float', nullable: true })
  diskReadOps?: number;

  @Property({ type: 'float', nullable: true })
  diskWriteOps?: number;

  /**
   * This can not be a foreign key because the server metrics
   * table is a TimescaleDB hypertable and foreign keys are not
   * supported.
   *
   * It should also improve performance.
   */
  @Property({ type: 'uuid', index: true })
  serverInstance!: string;
}
