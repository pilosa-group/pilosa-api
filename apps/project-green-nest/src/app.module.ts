import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientModule, Client } from '@app/client';
import { validationSchema } from './config/validation.schema';
import configuration, { DatabaseConfig } from './config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WebSnippetModule } from './web-snippet/web-snippet.module';
import { CloudAwsModule } from '@app/cloud-aws';
import { CloudModule } from '@app/cloud';
import { WebMetricsModule } from '@app/web-metrics';
import { FrontendApp } from '@app/web-metrics/entities/frontend-app.entity';
import { BrowserMetric } from '@app/web-metrics/entities/browser-metric.entity';
import { CloudMetricsModule } from '@app/cloud-metrics';
import { ServerMetric } from '@app/cloud-metrics/entities/server-metric.entity';
import { CloudProviderAccount } from '@app/cloud/entities/cloud-provider-account.entity';
import { ServerInstance } from '@app/cloud/entities/service-instance.entity';
import { HealthModule } from '@app/health';
import { AuthModule } from '@app/auth';
import { UserModule } from '@app/user';
import { User } from '@app/user/entities/user.entity';

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
          ssl: true,
          entities: [
            Client,
            CloudProviderAccount,
            ServerInstance,
            ServerMetric,
            FrontendApp,
            BrowserMetric,
            User,
          ],
          migrations: [
            'dist/apps/project-green-nest/apps/project-green-nest/src/db/*-migrations.js',
          ],
          cli: {
            migrationsDir: 'src/db/migrations',
          },
          // synchronize: true,
        };
      },
      inject: [ConfigService],
    }),
    AuthModule,
    ClientModule,
    WebMetricsModule,
    CloudMetricsModule,
    CloudModule,
    CloudAwsModule,
    WebSnippetModule,
    HealthModule,
  ],
})
export class AppModule {}
