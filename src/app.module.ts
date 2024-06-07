import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule } from './clients/clients.module';
import { CloudModule } from './cloud/cloud.module';
import { MetricsModule } from './metrics/metrics.module';
import { validationSchema } from './config/validation.schema';
import configuration, { DatabaseConfig } from './config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './clients/entities/client.entity';
import { AwsModule } from './aws/aws.module';
import { HealthController } from './health/health.controller';
import { CloudProviderAccount } from './cloud/entities/cloud-provider-account';
import { ServerInstance } from './cloud/entities/service-instance.entity';
import { ServerMetric } from './metrics/entities/server-metric.entity';
import { FrontendApp } from './metrics/entities/frontend-app.entity';
import { BrowserMetric } from './metrics/entities/browser-metric.entity';
import { SnippetConfig } from './metrics/entities/snippet-config.entity';
import { WebSnippetModule } from './web-snippet/web-snippet.module';

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
          entities: [
            Client,
            SnippetConfig,
            CloudProviderAccount,
            ServerInstance,
            ServerMetric,
            FrontendApp,
            BrowserMetric,
          ],
          migrations: ['dist/db/*-migrations.js'],
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
    AwsModule,
    WebSnippetModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
