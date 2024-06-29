import {
  PrimaryKey,
  Entity,
  ManyToOne,
  Property,
  OneToMany,
  Collection,
  PrimaryKeyProp,
} from '@mikro-orm/core';
import { Domain } from '@app/web-metrics/entities/domain.entity';
import { PathStatistics } from '@app/web-metrics/entities/path-statistics.entity';

@Entity()
export class Path {
  @ManyToOne({
    primary: true,
    deleteRule: 'cascade',
    entity: () => Domain,
  })
  domain: Domain;

  @PrimaryKey({ type: 'string' })
  path: string;

  [PrimaryKeyProp]?: ['domain', 'path'];

  @Property()
  title!: string;

  @OneToMany(() => PathStatistics, (stats: PathStatistics) => stats.path)
  stats = new Collection<PathStatistics>(this);

  constructor(domain: Domain, path: string) {
    this.domain = domain;
    this.path = path;
  }
}
