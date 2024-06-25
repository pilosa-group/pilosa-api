import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProjectModule } from '@app/project';
import { validationSchema } from './config/validation.schema';
import configuration, {
  AppConfig,
  DatabaseConfig,
  ENV_DEVELOPMENT,
} from './config/configuration';
import { WebSnippetModule } from './web-snippet/web-snippet.module';
import { CloudAwsModule } from '@app/cloud-aws';
import { CloudModule } from '@app/cloud';
import { WebMetricsModule } from '@app/web-metrics';
import { CloudMetricsModule } from '@app/cloud-metrics';
import { HealthModule } from '@app/health';
import { AuthModule } from '@app/auth';
import { UserModule } from '@app/user';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { JwtAuthGuard } from '@app/auth/guards/jwt-auth.guard';
import * as path from 'path';
import { MetricsModule } from '@app/metrics';
import { SyntheticScanModule } from '@app/synthetic-scan';
import { CacheModule } from '@nestjs/cache-manager';
import { IndexController } from './controllers/index.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { Migrator } from '@mikro-orm/migrations';
import { CustomNamingStrategy } from './config/custom-naming.strategy';

const srcRoot = path.join(process.cwd(), 'src');
const distSource = path.join(process.cwd(), 'dist');

@Module({
  controllers: [IndexController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
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

        const { env } = configService.get<AppConfig>('app');

        return {
          entitiesTs: [path.join(srcRoot, './**/*.entity.ts')],
          autoLoadEntities: true,
          debug: env === ENV_DEVELOPMENT,
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
