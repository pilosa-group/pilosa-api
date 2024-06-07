import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { ServerInstance } from '@app/cloud/entities/service-instance.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class ServerMetric {
  @PrimaryColumn('timestamptz', {
    default: () => 'CURRENT_TIMESTAMP',
  })
  time: Date;

  @Column('float')
  @Field()
  cpu: number;

  @Column('float', { nullable: true })
  @Field()
  networkIn: number;

  @Column('float', { nullable: true })
  @Field()
  networkOut: number;

  @Column('float', { nullable: true })
  @Field()
  diskReadOps: number;

  @Column('float', { nullable: true })
  @Field()
  diskWriteOps: number;

  @ManyToOne(
    () => ServerInstance,
    (serverInstance: ServerInstance) => serverInstance.metrics,
  )
  @JoinColumn()
  @Field((type) => [ServerInstance], { nullable: 'items' })
  serverInstance: ServerInstance;
}
