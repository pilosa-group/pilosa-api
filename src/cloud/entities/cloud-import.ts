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
import { Expose } from 'class-transformer';
import { Client } from '../../clients/entities/client.entity';

@Entity()
export class CloudImport {
  @PrimaryGeneratedColumn('uuid')
  @Expose()
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @Column('timestamp', {
    nullable: true,
  })
  lastImportedAt: Date;

  @Column('simple-enum', {
    enum: ['aws'],
  })
  provider: 'aws';

  @OneToOne(() => Client, (client: Client) => client.cloudImports)
  @JoinColumn()
  client: Client;
}
