'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const { Migration } = require('@mikro-orm/migrations');

class Migration20240712175835 extends Migration {
  async down() {
    this.addSql(
      'alter table "organization" drop constraint "organization_slug_unique";',
    );
    this.addSql('alter table "organization" drop column "slug";');

    this.addSql('alter table "project" drop constraint "project_slug_unique";');
    this.addSql('alter table "project" drop column "slug";');
  }

  async up() {
    this.addSql(
      'alter table "organization" add column "slug" varchar(255) null;',
    );
    this.addSql('update "organization" set "slug" = lower("name");');
    this.addSql('alter table "organization" alter column "slug" set not null;');
    this.addSql(
      'alter table "organization" add constraint "organization_slug_unique" unique ("slug");',
    );

    this.addSql('alter table "project" add column "slug" varchar(255) null;');

    this.addSql('update "project" set "slug" = lower("name");');
    this.addSql('alter table "project" alter column "slug" set not null;');
    this.addSql(
      'alter table "project" add constraint "project_slug_unique" unique ("slug");',
    );
  }
}
exports.Migration20240712175835 = Migration20240712175835;
