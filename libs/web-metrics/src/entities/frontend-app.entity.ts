import {
  Entity,
  OneToMany,
  ManyToOne,
  PrimaryKey,
  Property,
  Collection,
  Cascade,
} from '@mikro-orm/core';
import { Project } from '@app/project/entities/project.entity';
import { CrossOrigin } from '@app/web-metrics/entities/cross-origin.entity';
import { Expose } from 'class-transformer';

@Entity()
export class FrontendApp {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  @Expose()
  id: string;

  @Property()
  createdAt = new Date();

  @Property({ onUpdate: () => new Date(), nullable: true })
  updatedAt?: Date;

  @Property()
  @Expose()
  name!: string;

  @Property()
  @Expose()
  urls!: string[];

  @ManyToOne({
    entity: () => Project,
    deleteRule: 'cascade',
  })
  project: Project;

  @OneToMany(
    () => CrossOrigin,
    (crossOrigin: CrossOrigin) => crossOrigin.frontendApp,
    {
      cascade: [Cascade.PERSIST, Cascade.REMOVE],
    },
  )
  crossOrigins = new Collection<CrossOrigin>(this);
}
