import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { ServerInstance } from '@app/cloud/entities/service-instance.entity';
import { Field } from '@nestjs/graphql';

@Entity()
export class ServerMetric {
  @PrimaryColumn('timestamptz', {
    default: () => 'CURRENT_TIMESTAMP',
  })
  time: Date;

  period: Date;

  @Column('float')
  cpu: number;

  @Column('float', { nullable: true })
  networkIn: number;

  @Column('float', { nullable: true })
  networkOut: number;

  @Column('float', { nullable: true })
  diskReadOps: number;

  @Column('float', { nullable: true })
  diskWriteOps: number;

  @ManyToOne(
    () => ServerInstance,
    (serverInstance: ServerInstance) => serverInstance.metrics,
  )
  @JoinColumn()
  @Field((type) => [ServerInstance], { nullable: 'items' })
  serverInstance: ServerInstance;
}
