import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProjectModule } from '@app/project';
import { validationSchema } from './config/validation.schema';
import configuration, { DatabaseConfig } from './config/configuration';
import { WebSnippetModule } from './web-snippet/web-snippet.module';
import { CloudAwsModule } from '@app/cloud-aws';
import { CloudModule } from '@app/cloud';
import { WebMetricsModule } from '@app/web-metrics';
import { CloudMetricsModule } from '@app/cloud-metrics';
import { HealthModule } from '@app/health';
import { AuthModule } from '@app/auth';
import { UserModule } from '@app/user';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '@app/auth/guards/jwt-auth.guard';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import * as path from 'path';
import { MetricsModule } from '@app/metrics';
import { SyntheticScanModule } from '@app/synthetic-scan';
import { CacheModule } from '@nestjs/cache-manager';
import { IndexController } from './controllers/index.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { Migrator } from '@mikro-orm/migrations';
import { CustomNamingStrategy } from './config/mikro-orm.config';

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
          entitiesTs: [path.join(srcRoot, './**/*.entity.ts')],
          autoLoadEntities: true,
          debug: true,
          migrations: {
            path: path.join(distSource, './apps/pilosa/apps/pilosa/src/db/'),
            pathTs: path.join(srcRoot, './db/'),
          },
          extensions: [Migrator],
          namingStrategy: CustomNamingStrategy,
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
