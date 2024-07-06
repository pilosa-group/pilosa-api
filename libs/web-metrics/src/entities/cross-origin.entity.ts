import { FrontendApp } from '@app/web-metrics/entities/frontend-app.entity';
import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class CrossOrigin {
  @Property({
    defaultRaw: 'CURRENT_TIMESTAMP',
    type: 'timestamptz',
  })
  createdAt!: Date;

  @Property()
  domain!: string;

  @ManyToOne({
    deleteRule: 'cascade',
    entity: () => FrontendApp,
  })
  frontendApp!: FrontendApp;

  @PrimaryKey({ defaultRaw: 'gen_random_uuid()', type: 'uuid' })
  id: string;
}
