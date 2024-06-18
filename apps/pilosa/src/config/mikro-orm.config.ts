import { Migrator } from '@mikro-orm/migrations';
import { defineConfig, PostgreSqlDriver } from '@mikro-orm/postgresql';
import { ConfigModule } from '@nestjs/config';
import { CustomNamingStrategy } from './custom-naming.strategy';

ConfigModule.forRoot();

export default defineConfig({
  entities: ['dist/**/*.entity.js'],
  extensions: [Migrator],
  driver: PostgreSqlDriver,
  namingStrategy: CustomNamingStrategy,
  migrations: {
    path: 'apps/pilosa/src/db/migrations',
    disableForeignKeys: true,
    snapshot: false,
    emit: 'js',
  },
  host: process.env.DB_HOST,
  dbName: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  user: process.env.DB_USERNAME,
  port: Number(process.env.DB_PORT),
  driverOptions: {
    connection: { ssl: Number(process.env.DB_SSL) === 1 },
  },
  debug: true,
});
