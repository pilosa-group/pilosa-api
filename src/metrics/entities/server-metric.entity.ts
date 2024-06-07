import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { ServerInstance } from '../../cloud/entities/service-instance.entity';

@Entity()
@Exclude()
export class ServerMetric {
  @PrimaryGeneratedColumn('uuid')
  @Expose()
  id: string;

  @CreateDateColumn()
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
