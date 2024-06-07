import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { FrontendApp } from '@app/web-metrics/entities/frontend-app.entity';

@Entity()
@ObjectType()
export class BrowserMetricCrossOrigin {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  domain: string;

  @ManyToOne(
    () => FrontendApp,
    (frontendApp: FrontendApp) => frontendApp.crossOrigins,
  )
  @JoinColumn()
  @Field(() => FrontendApp)
  frontendApp: FrontendApp;
}
