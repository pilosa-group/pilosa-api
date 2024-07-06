import { Project } from '@app/project/entities/project.entity';
import { CrossOrigin } from '@app/web-metrics/entities/cross-origin.entity';
import {
  Cascade,
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

@Entity()
export class FrontendApp {
  @Property()
  createdAt = new Date();

  @OneToMany(
    () => CrossOrigin,
    (crossOrigin: CrossOrigin) => crossOrigin.frontendApp,
    {
      cascade: [Cascade.PERSIST, Cascade.REMOVE],
    },
  )
  crossOrigins = new Collection<CrossOrigin>(this);

  @PrimaryKey({ defaultRaw: 'gen_random_uuid()', type: 'uuid' })
  @Expose()
  @ApiProperty({ format: 'uuid', type: 'string' })
  id: string;

  @Property()
  @Expose()
  @ApiProperty()
  name!: string;

  @ManyToOne({
    deleteRule: 'cascade',
    entity: () => Project,
  })
  project: Project;

  @Property({ nullable: true, onUpdate: () => new Date() })
  updatedAt?: Date;

  @Property()
  @Expose()
  @ApiProperty({ format: 'domain', isArray: true, type: 'string' })
  urls!: string[];
}
