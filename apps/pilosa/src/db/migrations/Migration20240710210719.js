'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const { Migration } = require('@mikro-orm/migrations');

class Migration20240710210719 extends Migration {

  async up() {
    this.addSql('create table "project_member" ("id" uuid not null default gen_random_uuid(), "project" uuid not null, "role" text check ("role" in (\'member\', \'owner\')) not null default \'member\', "user" uuid not null, constraint "project_member_pkey" primary key ("id"));');

    this.addSql('create table "organization_member" ("id" uuid not null default gen_random_uuid(), "organization" uuid not null, "role" text check ("role" in (\'member\', \'owner\')) not null default \'member\', "user" uuid not null, constraint "organization_member_pkey" primary key ("id"));');

    this.addSql('alter table "project_member" add constraint "project_member_project_foreign" foreign key ("project") references "project" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "project_member" add constraint "project_member_user_foreign" foreign key ("user") references "user" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "organization_member" add constraint "organization_member_organization_foreign" foreign key ("organization") references "organization" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "organization_member" add constraint "organization_member_user_foreign" foreign key ("user") references "user" ("id") on update cascade on delete cascade;');

    this.addSql('drop table if exists "organization_to_user" cascade;');

    this.addSql('drop table if exists "project_to_user" cascade;');

    this.addSql('alter table "asset_group_statistics" drop constraint if exists "asset_group_statistics_name_check";');

    this.addSql('alter table "asset_group_statistics" add constraint "asset_group_statistics_name_check" check("name" in (\'audio\', \'fonts\', \'images\', \'json\', \'other\', \'scripts\', \'stylesheets\', \'text\', \'video\'));');
  }

  async down() {
    this.addSql('create table "organization_to_user" ("id" uuid not null default gen_random_uuid(), "roles" text[] not null, "organization" uuid not null, "user" uuid not null, constraint "organization_to_user_pkey" primary key ("id"));');

    this.addSql('create table "project_to_user" ("id" uuid not null default gen_random_uuid(), "roles" text[] not null, "project" uuid not null, "user" uuid not null, constraint "project_to_user_pkey" primary key ("id"));');

    this.addSql('alter table "organization_to_user" add constraint "organization_to_user_organization_foreign" foreign key ("organization") references "organization" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "organization_to_user" add constraint "organization_to_user_user_foreign" foreign key ("user") references "user" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "project_to_user" add constraint "project_to_user_project_foreign" foreign key ("project") references "project" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "project_to_user" add constraint "project_to_user_user_foreign" foreign key ("user") references "user" ("id") on update cascade on delete cascade;');

    this.addSql('drop table if exists "project_member" cascade;');

    this.addSql('drop table if exists "organization_member" cascade;');

    this.addSql('alter table "asset_group_statistics" drop constraint if exists "asset_group_statistics_name_check";');

    this.addSql('alter table "asset_group_statistics" add constraint "asset_group_statistics_name_check" check("name" in (\'images\', \'stylesheets\', \'scripts\', \'json\', \'fonts\', \'video\', \'audio\', \'text\', \'other\'));');
  }

}
exports.Migration20240710210719 = Migration20240710210719;
