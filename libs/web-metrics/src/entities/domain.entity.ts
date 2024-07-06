import { Path } from '@app/web-metrics/entities/path.entity';
import {
  Cascade,
  Collection,
  Entity,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';

@Entity()
export class Domain {
  @Property({
    defaultRaw: 'CURRENT_TIMESTAMP',
    type: 'timestamptz',
  })
  createdAt!: Date;

  @PrimaryKey({ type: 'string', unique: true })
  fqdn: string;

  @Property({ type: 'boolean' })
  isGreenHost!: boolean;

  @OneToMany(() => Path, (path: Path) => path.domain, {
    cascade: [Cascade.PERSIST, Cascade.REMOVE],
  })
  paths = new Collection<Path>(this);

  constructor(fqdn: string) {
    this.fqdn = fqdn;
  }
}
