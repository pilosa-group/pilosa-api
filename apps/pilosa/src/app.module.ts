import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProjectModule } from '@app/project';
import { validationSchema } from './config/validation.schema';
import configuration, { DatabaseConfig } from './config/configuration';
import { WebSnippetModule } from './web-snippet/web-snippet.module';
import { CloudAwsModule } from '@app/cloud-aws';
import { CloudModule } from '@app/cloud';
import { WebMetricsModule } from '@app/web-metrics';
// import { FrontendApp } from '@app/web-metrics/entities/frontend-app.entity';
// import { BrowserMetric } from '@app/web-metrics/entities/browser-metric.entity';
import { CloudMetricsModule } from '@app/cloud-metrics';
// import { ServerMetric } from '@app/cloud-metrics/entities/server-metric.entity';
// import { CloudProviderAccount } from '@app/cloud/entities/cloud-provider-account.entity';
// import { ServerInstance } from '@app/cloud/entities/service-instance.entity';
import { HealthModule } from '@app/health';
import { AuthModule } from '@app/auth';
import { UserModule } from '@app/user';
// import { User } from '@app/user/entities/user.entity';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '@app/auth/guards/jwt-auth.guard';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import * as path from 'path';
// import { Organization } from '@app/project/entities/organization.entity';
// import { UserOrganizationRole } from '@app/project/entities/user-organization-role.entity';
// import { UserProjectRole } from '@app/project/entities/user-project-role.entity';
// import { Project } from '@app/project/entities/project.entity';
import { MetricsModule } from '@app/metrics';
// import { BrowserMetricCrossOrigin } from '@app/web-metrics/entities/browser-metric-cross-origin.entity';
import { SyntheticScanModule } from '@app/synthetic-scan';
import { CacheModule } from '@nestjs/cache-manager';
import { IndexController } from './controllers/index.controller';
// import { BrowserMetricDomain } from '@app/web-metrics/entities/browser-metric-domain.entity';
// import { BrowserMetricAssetGroup } from '@app/web-metrics/entities/browser-metric-asset-group.entity';
// import { BrowserMetricPath } from '@app/web-metrics/entities/browser-metric-path.entity';
// import { BrowserMetricPathStats } from '@app/web-metrics/entities/browser-metric-path-stats.entity';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { Migrator } from '@mikro-orm/migrations';

const srcRoot = path.join(process.cwd(), 'src');
const distSource = path.join(process.cwd(), 'dist');

@Module({
  controllers: [IndexController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  imports: [
    CacheModule.register({
      isGlobal: true,
    }),
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema,
    }),
    // GraphQLModule.forRoot<ApolloDriverConfig>({
    //   driver: ApolloDriver,
    //   autoSchemaFile: path.join(process.cwd(), 'src/schema.gql'),
    //   allowBatchedHttpRequests: true,
    //   sortSchema: true,
    // }),
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const {
          port,
          host,
          database,
          username: user,
          password,
          ssl,
        } = configService.get<DatabaseConfig>('database');

        return {
          // entities: [path.join(distSource, './**/*.entity.js')],
          entitiesTs: [path.join(srcRoot, './**/*.entity.ts')],
          autoLoadEntities: true,
          debug: true,
          migrations: {
            path: path.join(distSource, './apps/pilosa/apps/pilosa/src/db/'),
            pathTs: path.join(srcRoot, './db/'),
          },
          extensions: [Migrator],
          driver: PostgreSqlDriver,
          host,
          port,
          user,
          password,
          dbName: database,
          driverOptions: {
            connection: { ssl },
          },
        };
      },
    }),
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   useFactory: (configService: ConfigService) => {
    //     const { port, host, database, username, password, ssl } =
    //       configService.get<DatabaseConfig>('database');
    //
    //     return {
    //       type: 'postgres',
    //       host,
    //       port,
    //       username,
    //       password,
    //       database,
    //       ssl,
    //       entities: [
    //         BrowserMetric,
    //         BrowserMetricAssetGroup,
    //         BrowserMetricCrossOrigin,
    //         BrowserMetricDomain,
    //         BrowserMetricPath,
    //         BrowserMetricPathStats,
    //         CloudProviderAccount,
    //         FrontendApp,
    //         Organization,
    //         Project,
    //         ServerInstance,
    //         ServerMetric,
    //         User,
    //         UserOrganizationRole,
    //         UserProjectRole,
    //       ],
    //       migrations: ['dist/apps/pilosa/apps/pilosa/src/db/*-migrations.js'],
    //       cli: {
    //         migrationsDir: 'src/db/migrations',
    //       },
    //     };
    //   },
    //   inject: [ConfigService],
    // }),
    AuthModule,
    ProjectModule,
    WebMetricsModule,
    MetricsModule,
    CloudMetricsModule,
    CloudModule,
    CloudAwsModule,
    UserModule,
    WebSnippetModule,
    HealthModule,
    SyntheticScanModule,
  ],
})
export class AppModule {}
