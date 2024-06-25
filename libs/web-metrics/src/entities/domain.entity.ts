import {
  Cascade,
  Collection,
  Entity,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Path } from '@app/web-metrics/entities/path.entity';
import { Exclude } from 'class-transformer';

@Entity()
@Exclude()
export class Domain {
  @PrimaryKey({ type: 'string', unique: true })
  fqdn: string;

  @Property({
    type: 'timestamptz',
    defaultRaw: 'CURRENT_TIMESTAMP',
  })
  createdAt!: Date;

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
