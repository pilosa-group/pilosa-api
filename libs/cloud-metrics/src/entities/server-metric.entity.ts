import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { ServerInstance } from '@app/cloud/entities/service-instance.entity';

@Entity()
@Exclude()
export class ServerMetric {
  @PrimaryColumn('timestamptz', {
    default: () => 'CURRENT_TIMESTAMP',
  })
  @Expose()
  time: Date;

  @Column('float')
  @Expose()
  cpu: number;

  @Column('float', { nullable: true })
  @Expose()
  networkIn: number;

  @Column('float', { nullable: true })
  @Expose()
  networkOut: number;

  @Column('float', { nullable: true })
  @Expose()
  diskReadOps: number;

  @Column('float', { nullable: true })
  @Expose()
  diskWriteOps: number;

  @ManyToOne(
    () => ServerInstance,
    (serverInstance: ServerInstance) => serverInstance.metrics,
  )
  @JoinColumn()
  serverInstance: ServerInstance;
}
