import { TransformerService } from '@app/api/transformer.service';
import { AuthModule } from '@app/auth';
import { JwtAuthGuard } from '@app/auth/guards/jwt-auth.guard';
import { CloudModule } from '@app/cloud';
import { CloudAwsModule } from '@app/cloud-aws';
import { CloudMetricsModule } from '@app/cloud-metrics';
import { HealthModule } from '@app/health';
import { MetricsModule } from '@app/metrics';
import { ProjectModule } from '@app/project';
import { SyntheticScanModule } from '@app/synthetic-scan';
import { UserModule } from '@app/user';
import { WebMetricsModule } from '@app/web-metrics';
import { Migrator } from '@mikro-orm/migrations';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { CacheModule } from '@nestjs/cache-manager';
import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD, APP_INTERCEPTOR, Reflector } from '@nestjs/core';
import * as path from 'path';

import configuration, {
  AppConfig,
  DatabaseConfig,
  ENV_DEVELOPMENT,
  ENV_TEST,
} from './config/configuration';
import { CustomNamingStrategy } from './config/custom-naming.strategy';
import { validationSchema } from './config/validation.schema';
import { IndexController } from './controllers/index.controller';
import { RobotsController } from './controllers/robots.controller';
import { WebSnippetModule } from './web-snippet/web-snippet.module';

const srcRoot = path.join(process.cwd(), 'src');
const distSource = path.join(process.cwd(), 'dist');

@Module({
  controllers: [IndexController, RobotsController],
  imports: [
    CacheModule.register({
      isGlobal: true,
    }),
    ConfigModule.forRoot({
      envFilePath: [process.env.NODE_ENV === ENV_TEST ? '.env.test' : '.env'],
      load: [configuration],
      validationSchema,
    }),
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const {
          database,
          host,
          password,
          port,
          ssl,
          username: user,
        } = configService.get<DatabaseConfig>('database');

        const { env } = configService.get<AppConfig>('app');

        return {
          autoLoadEntities: true,
          dbName: database,
          debug: env === ENV_DEVELOPMENT,
          driver: PostgreSqlDriver,
          driverOptions: {
            connection: { ssl },
          },
          entitiesTs: [path.join(srcRoot, './**/*.entity.ts')],
          extensions: [Migrator],
          host,
          migrations: {
            path: path.join(distSource, './apps/pilosa/apps/pilosa/src/db/'),
            pathTs: path.join(srcRoot, './db/'),
          },
          namingStrategy: CustomNamingStrategy,
          password,
          port,
          user,
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
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      inject: [Reflector],
      provide: APP_INTERCEPTOR,
      useFactory: (reflector: Reflector) =>
        new ClassSerializerInterceptor(
          reflector,
          TransformerService.defaultOptions,
        ),
    },
  ],
})
export class AppModule {}
