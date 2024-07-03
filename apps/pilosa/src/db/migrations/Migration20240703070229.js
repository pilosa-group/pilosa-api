'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const { Migration } = require('@mikro-orm/migrations');

class Migration20240703070229 extends Migration {

  async up() {
    this.addSql('drop table if exists "browser_metric_path_statistics" cascade;');

    this.addSql('alter table "browser_metric" drop constraint "browser_metric_frontendApp_foreign";');

    this.addSql('alter table "server_metric" drop constraint "server_metric_serverInstance_foreign";');

    this.addSql('alter table "browser_metric" drop constraint "browser_metric_pkey";');

    this.addSql('alter table "browser_metric" alter column "domain" type text using ("domain"::text);');
    this.addSql('alter table "browser_metric" alter column "initiatorType" type text using ("initiatorType"::text);');
    this.addSql('alter table "browser_metric" alter column "extension" type text using ("extension"::text);');
    this.addSql('alter table "browser_metric" alter column "visitor" type text using ("visitor"::text);');
    this.addSql('alter table "browser_metric" alter column "deviceType" type text using ("deviceType"::text);');
    this.addSql('alter table "browser_metric" alter column "device" type text using ("device"::text);');
    this.addSql('alter table "browser_metric" alter column "os" type text using ("os"::text);');
    this.addSql('alter table "browser_metric" alter column "browser" type text using ("browser"::text);');
    this.addSql('alter table "browser_metric" alter column "cpu" type text using ("cpu"::text);');
    this.addSql('create index "browser_metric_frontendApp_index" on "browser_metric" ("frontendApp");');
    this.addSql('alter table "browser_metric" add constraint "browser_metric_pkey" primary key ("id", "time");');

    this.addSql('alter table "server_metric" drop constraint "server_metric_pkey";');

    this.addSql('create index "server_metric_serverInstance_index" on "server_metric" ("serverInstance");');
    this.addSql('alter table "server_metric" add constraint "server_metric_pkey" primary key ("id", "time");');
  }

  async down() {
    this.addSql('create table "browser_metric_path_statistics" ("browserMetric" uuid not null, "pathStatistics" uuid not null, constraint "browser_metric_path_statistics_pkey" primary key ("browserMetric", "pathStatistics"));');

    this.addSql('alter table "browser_metric_path_statistics" add constraint "browser_metric_path_statistics_browserMetric_foreign" foreign key ("browserMetric") references "browser_metric" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "browser_metric_path_statistics" add constraint "browser_metric_path_statistics_pathStatistics_foreign" foreign key ("pathStatistics") references "path_statistics" ("id") on update cascade on delete cascade;');

    this.addSql('drop index "browser_metric_frontendApp_index";');
    this.addSql('alter table "browser_metric" drop constraint "browser_metric_pkey";');

    this.addSql('alter table "browser_metric" alter column "domain" type varchar(255) using ("domain"::varchar(255));');
    this.addSql('alter table "browser_metric" alter column "initiatorType" type varchar(255) using ("initiatorType"::varchar(255));');
    this.addSql('alter table "browser_metric" alter column "extension" type varchar(255) using ("extension"::varchar(255));');
    this.addSql('alter table "browser_metric" alter column "visitor" type varchar(255) using ("visitor"::varchar(255));');
    this.addSql('alter table "browser_metric" alter column "deviceType" type varchar(255) using ("deviceType"::varchar(255));');
    this.addSql('alter table "browser_metric" alter column "device" type varchar(255) using ("device"::varchar(255));');
    this.addSql('alter table "browser_metric" alter column "os" type varchar(255) using ("os"::varchar(255));');
    this.addSql('alter table "browser_metric" alter column "browser" type varchar(255) using ("browser"::varchar(255));');
    this.addSql('alter table "browser_metric" alter column "cpu" type varchar(255) using ("cpu"::varchar(255));');
    this.addSql('alter table "browser_metric" add constraint "browser_metric_frontendApp_foreign" foreign key ("frontendApp") references "frontend_app" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "browser_metric" add constraint "browser_metric_pkey" primary key ("id");');

    this.addSql('drop index "server_metric_serverInstance_index";');
    this.addSql('alter table "server_metric" drop constraint "server_metric_pkey";');

    this.addSql('alter table "server_metric" add constraint "server_metric_serverInstance_foreign" foreign key ("serverInstance") references "server_instance" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "server_metric" add constraint "server_metric_pkey" primary key ("id");');
  }

}
exports.Migration20240703070229 = Migration20240703070229;
