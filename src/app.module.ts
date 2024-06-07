import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule } from './clients/clients.module';
import { CloudModule } from './cloud/cloud.module';
import { MetricsModule } from './metrics/metrics.module';
import { validationSchema } from './config/validation.schema';
import configuration, { DatabaseConfig } from './config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './clients/entities/client.entity';
import { SnippetConfig } from './clients/entities/snippet-config.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const { port, host, database, username, password } =
          configService.get<DatabaseConfig>('database');

        return {
          type: 'postgres',
          host,
          port,
          username,
          password,
          database,
          entities: [Client, SnippetConfig],
          migrations: ['dist/db/migrations/*.js'],
          cli: {
            migrationsDir: 'src/db/migrations',
          },
          // synchronize: true,
        };
      },
      inject: [ConfigService],
    }),
    ClientsModule,
    MetricsModule,
    CloudModule,
    MetricsModule,
  ],
})
export class AppModule {}
