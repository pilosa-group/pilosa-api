import { Migrator } from '@mikro-orm/migrations';
import { PostgreSqlDriver, defineConfig } from '@mikro-orm/postgresql';
import { ConfigModule } from '@nestjs/config';

import { CustomNamingStrategy } from './custom-naming.strategy';

ConfigModule.forRoot();

export default defineConfig({
  dbName: process.env.DB_DATABASE,
  debug: true,
  driver: PostgreSqlDriver,
  driverOptions: {
    connection: { ssl: Number(process.env.DB_SSL) === 1 },
  },
  entities: ['dist/**/*.entity.js'],
  extensions: [Migrator],
  host: process.env.DB_HOST,
  migrations: {
    disableForeignKeys: true,
    emit: 'js',
    path: 'apps/pilosa/src/db/migrations',
    snapshot: false,
  },
  namingStrategy: CustomNamingStrategy,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USERNAME,
});
