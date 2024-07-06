import { Domain } from '@app/web-metrics/entities/domain.entity';
import { PathStatistics } from '@app/web-metrics/entities/path-statistics.entity';
import {
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  PrimaryKeyProp,
  Property,
} from '@mikro-orm/core';

@Entity()
export class Path {
  [PrimaryKeyProp]?: ['domain', 'path'];

  @ManyToOne({
    deleteRule: 'cascade',
    entity: () => Domain,
    primary: true,
  })
  domain: Domain;

  @PrimaryKey({ type: 'string' })
  path: string;

  @OneToMany(() => PathStatistics, (stats: PathStatistics) => stats.path)
  stats = new Collection<PathStatistics>(this);

  @Property()
  title!: string;

  constructor(domain: Domain, path: string) {
    this.domain = domain;
    this.path = path;
  }
}
