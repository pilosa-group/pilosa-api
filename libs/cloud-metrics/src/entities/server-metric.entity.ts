import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { ServerInstance } from '@app/cloud/entities/service-instance.entity';
import { Exclude } from 'class-transformer';

@Entity()
@Exclude()
export class ServerMetric {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id: string;

  @Property({
    type: 'timestamptz',
    defaultRaw: 'CURRENT_TIMESTAMP',
  })
  time!: Date;

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

  @ManyToOne({
    entity: () => ServerInstance,
    deleteRule: 'cascade',
  })
  serverInstance: ServerInstance;
}
