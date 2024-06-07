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

  @Column({ default: false })
  firstLoad: boolean;

  @Column('simple-enum', {
    enum: ['dark', 'light'],
    default: 'light',
  })
  colorScheme: string = 'light';

  @Column()
  @Field()
  domain: string;

  @Column()
  @Field()
  path: string;

  @Column({ nullable: true })
  initiatorType: string;

  @Column({ nullable: true })
  extension: string;

  @Column('float')
  @Field(() => GraphQLFloat)
  bytesCompressed: number;

  @Column('float')
  @Field(() => GraphQLFloat)
  bytesUncompressed: number;

  @Column()
  @Field()
  userAgent: string;

  @Column({ nullable: true })
  visitor: string;

  @ManyToOne(
    () => FrontendApp,
    (frontendApp: FrontendApp) => frontendApp.metrics,
  )
  @JoinColumn()
  @Field(() => FrontendApp)
  frontendApp: FrontendApp;
}
