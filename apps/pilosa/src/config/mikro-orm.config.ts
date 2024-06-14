import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { ConfigService } from '@nestjs/config';
import { DatabaseConfig } from './configuration';
import path from 'path';
import { Migrator, JSMigrationGenerator } from '@mikro-orm/migrations';
import { defineConfig, PostgreSqlDriver } from '@mikro-orm/postgresql';

// console.log(process.env);
//
// // @ts-expect-error let's just do this
// const dataSource = NestFactory.create(AppModule).then((app) => {
//   const configService = app.get(ConfigService);
//
//   const {
//     port,
//     host,
//     database,
//     username: user,
//     password,
//     ssl,
//   } = configService.get<DatabaseConfig>('database');
//
//   return {
//     entities: [path.join(distSource, './**/*.entity.js')],
//     autoLoadEntities: true,
//     debug: true,
//     migrations: {
//       path: path.join(distSource, './apps/pilosa/apps/pilosa/src/db/'),
//     },
//     extensions: [Migrator],
//     driver: PostgreSqlDriver,
//     host,
//     port,
//     user,
//     password,
//     dbName: database,
//     driverOptions: {
//       connection: { ssl },
//     },
//   };
// });

export default defineConfig({
  entities: ['dist/**/*.entity.js'],
  extensions: [Migrator],
  dbName: 'pilosa',
  driver: PostgreSqlDriver,
  migrations: {
    path: 'src/migrations',
    snapshot: false,
    emit: 'js',
  },
  host: 'localhost',
  password: 'pilosa',
  user: 'pilosa',
  port: 5432,
  debug: true,
});
