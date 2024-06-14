import { PrimaryKey, Entity, ManyToOne, Property } from '@mikro-orm/core';
import { FrontendApp } from '@app/web-metrics/entities/frontend-app.entity';

@Entity()
export class BrowserMetricCrossOrigin {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id: string;

  @Property()
  domain!: string;

  @ManyToOne({
    entity: () => FrontendApp,
  })
  frontendApp!: FrontendApp;
}
