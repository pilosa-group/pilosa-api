import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Client } from './client.entity';

@Entity()
@Exclude()
export class AWSCredentials {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @Column()
  @Exclude()
  accessKeyId: string;

  @Column()
  @Exclude()
  secretAccessKey: string;

  @Column()
  @Exclude()
  region: string;

  @OneToOne(() => Client, (client: Client) => client.snippetConfig)
  @JoinColumn()
  client: Client;
}
