import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { FrontendApp } from './frontend-app.entity';
import { Field, ObjectType } from '@nestjs/graphql';
import { GraphQLFloat } from 'graphql/type';

@Entity()
@ObjectType()
export class BrowserMetric {
  @PrimaryColumn('timestamptz', {
    default: () => 'CURRENT_TIMESTAMP',
  })
  @Field()
  time: Date;

  @Column()
  @Field()
  domain: string;

  @Column()
  @Field()
  path: string;

  @Column()
  @Field()
  userAgent: string;

  @Column({ nullable: true })
  ip: string;

  @Column('float')
  @Field((type) => GraphQLFloat)
  bytes: number;

  @Column('float')
  @Field((type) => GraphQLFloat)
  bytesCached: number;

  @Column('float')
  @Field((type) => GraphQLFloat)
  accuracy: number;

  @ManyToOne(
    () => FrontendApp,
    (frontendApp: FrontendApp) => frontendApp.metrics,
  )
  @JoinColumn()
  @Field((type) => FrontendApp)
  frontendApp: FrontendApp;
}
